import asyncio
import json
from datetime import datetime, timezone
from typing import Any

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ClaudeSDKClient,
    ResultMessage,
)

from shared.display import print_section
from shared.files import write_json_file, write_text_lines
from shared.messages import append_result_message, print_assistant_message
from shared.paths import OUTPUT_DIR, PROJECT_ROOT


USER_ID = "learner-001"
SELECTED_SESSION_ID = None
SESSION_REGISTRY_PATH = OUTPUT_DIR / "lesson_15_session_registry.json"
RESUME_TRANSCRIPT_DIR = OUTPUT_DIR / "lesson_16_resume_transcripts"

FOLLOW_UP_PROMPT = (
    "前回のセッションで説明した内容を前提に、"
    "Webアプリでsession_idをDBに保存するときの注意点を3つ教えてください。"
)


# UTCの現在時刻を、JSONに保存しやすい文字列にする関数です。
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ファイル名に使いやすいUTC時刻文字列を作る関数です。
def now_file_stamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


# Lesson 15で作ったセッション台帳を読み込む関数です。
def load_registry() -> dict[str, Any]:
    if not SESSION_REGISTRY_PATH.exists():
        raise FileNotFoundError(
            "セッション台帳が見つかりません。先にLesson 15を実行してください。"
        )

    return json.loads(SESSION_REGISTRY_PATH.read_text(encoding="utf-8"))


# セッション台帳から、指定したuser_idのユーザー記録を探す関数です。
def find_user_record(registry: dict[str, Any], user_id: str) -> dict[str, Any]:
    users = registry.get("users", [])

    for user_record in users:
        if user_record.get("user_id") == user_id:
            return user_record

    raise ValueError(f"user_id={user_id} のユーザー記録が台帳にありません。")


# ユーザー記録から、再開したいセッション記録を取り出す関数です。
def select_session_record(
    user_record: dict[str, Any],
    selected_session_id,
) -> dict[str, Any]:
    sessions = user_record.get("sessions", [])

    if not sessions:
        raise ValueError(f"user_id={user_record.get('user_id')} のセッションが台帳にありません。")

    if selected_session_id is None:
        return sessions[-1]

    for session_record in sessions:
        if session_record.get("session_id") == selected_session_id:
            return session_record

    raise ValueError(f"session_id={selected_session_id} が台帳にありません。")


# resume結果を保存するtranscriptファイルの保存先を作る関数です。
def build_resume_transcript_path(session_id: str):
    file_name = f"{session_id}_{now_file_stamp()}.txt"
    return RESUME_TRANSCRIPT_DIR / file_name


# 保存済みsession_idを使って、特定の過去セッションを再開する設定を作る関数です。
def build_resume_options(session_id: str) -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        resume=session_id,
        system_prompt=(
            "あなたはClaude Agent SDKを学ぶ日本語教材の補助者です。"
            "前回の会話文脈を踏まえ、短く実務的に答えてください。"
        ),
        disallowed_tools=["Read", "Glob", "Grep", "Write", "Edit", "Bash"],
        max_turns=2,
    )


# Agentからの応答を最後まで読み、ResultMessageと表示用テキストを返す関数です。
async def receive_response(
    client: ClaudeSDKClient,
):
    result_message: ResultMessage | None = None
    output_lines: list[str] = []

    async for message in client.receive_response():
        if isinstance(message, AssistantMessage):
            print_assistant_message(message, output_lines)
        elif isinstance(message, ResultMessage):
            result_message = message
            append_result_message(result_message, output_lines, include_result=False)

    if result_message is None:
        raise RuntimeError("ResultMessageを受け取れなかったため、resume結果を保存できません。")

    return result_message, output_lines


# 保存済みsession_idを使ってClaudeSDKClientに続きの質問を送る関数です。
async def run_resume_agent(session_id: str):
    async with ClaudeSDKClient(options=build_resume_options(session_id)) as client:
        await client.query(FOLLOW_UP_PROMPT)
        return await receive_response(client)


# resume実行結果を、transcriptファイルに書き込む行リストへ整える関数です。
def build_resume_transcript(
    session_id: str,
    result_message: ResultMessage,
    transcript_lines: list[str],
) -> list[str]:
    return [
        "ClaudeSDKClient resume transcript",
        "",
        f"user_id: {USER_ID}",
        f"resume_session_id: {session_id}",
        f"result_session_id: {result_message.session_id}",
        "",
        "Prompt:",
        FOLLOW_UP_PROMPT,
        "",
        "Response:",
        *transcript_lines,
    ]


# resume後の状態を、Lesson 15のセッション台帳へ追記する関数です。
def update_registry_after_resume(
    registry: dict[str, Any],
    session_record: dict[str, Any],
    result_message: ResultMessage,
    resume_transcript_path: str,
) -> dict[str, Any]:
    session_record["last_resumed_at"] = now_iso()
    session_record["last_subtype"] = result_message.subtype
    session_record["is_error"] = result_message.is_error
    session_record["num_turns"] = result_message.num_turns
    session_record["updated_at"] = now_iso()
    session_record["last_result_session_id"] = result_message.session_id
    session_record["last_resume_transcript_path"] = resume_transcript_path

    registry["updated_at"] = now_iso()
    return registry


# resume結果を保存し、台帳にも最後のresume情報を反映する関数です。
def save_resume_result(
    registry: dict[str, Any],
    session_record: dict[str, Any],
    result_message: ResultMessage,
    transcript_lines: list[str],
) -> str:
    session_id = str(session_record["session_id"])
    resume_transcript_path = build_resume_transcript_path(session_id)
    transcript = build_resume_transcript(session_id, result_message, transcript_lines)
    updated_registry = update_registry_after_resume(
        registry,
        session_record,
        result_message,
        str(resume_transcript_path),
    )

    write_json_file(SESSION_REGISTRY_PATH, updated_registry)
    write_text_lines(resume_transcript_path, transcript)
    return str(resume_transcript_path)


# 保存済みsession_idを読み込み、ClaudeSDKClientで会話を再開する関数です。
async def resume_saved_session() -> None:
    registry = load_registry()
    user_record = find_user_record(registry, USER_ID)
    session_record = select_session_record(user_record, SELECTED_SESSION_ID)
    session_id = str(session_record["session_id"])

    print_section("Resume target")
    print(f"user_id: {USER_ID}")
    print(f"session_id: {session_id}")
    print(f"cwd: {session_record.get('cwd')}")
    print(f"original_transcript: {session_record.get('transcript_path')}")

    agent_response = await run_resume_agent(session_id)
    if agent_response is None:
        raise RuntimeError("Agentの応答を受け取れませんでした。")

    result_message = agent_response[0]
    transcript_lines = agent_response[1]
    resume_transcript_path = save_resume_result(
        registry,
        session_record,
        result_message,
        transcript_lines,
    )

    print_section("Saved resume result")
    print(f"registry: {SESSION_REGISTRY_PATH}")
    print(f"transcript: {resume_transcript_path}")


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    asyncio.run(resume_saved_session())


if __name__ == "__main__":
    main()
