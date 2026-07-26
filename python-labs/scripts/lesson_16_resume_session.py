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
SESSION_REGISTRY_PATH = OUTPUT_DIR / "lesson_15_session_registry.json"
RESUME_TRANSCRIPT_PATH = OUTPUT_DIR / "lesson_16_resume_transcript.txt"

FOLLOW_UP_PROMPT = (
    "前回のセッションで説明した内容を前提に、"
    "Webアプリでsession_idをDBに保存するときの注意点を3つ教えてください。"
)


# UTCの現在時刻を、JSONに保存しやすい文字列にする関数です。
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# Lesson 15で作ったセッション台帳を読み込む関数です。
def load_registry() -> dict[str, Any]:
    if not SESSION_REGISTRY_PATH.exists():
        raise FileNotFoundError(
            "セッション台帳が見つかりません。先にLesson 15を実行してください。"
        )

    return json.loads(SESSION_REGISTRY_PATH.read_text(encoding="utf-8"))


# セッション台帳から、指定したuser_idのセッション情報を探す関数です。
def find_session_entry(registry: dict[str, Any], user_id: str) -> dict[str, Any]:
    sessions = registry.get("sessions", [])

    for session in sessions:
        if session.get("user_id") == user_id:
            return session

    raise ValueError(f"user_id={user_id} のセッションが台帳にありません。")


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
) -> tuple[ResultMessage | None, list[str]]:
    result_message = None
    output_lines: list[str] = []

    async for message in client.receive_response():
        if isinstance(message, AssistantMessage):
            print_assistant_message(message, output_lines)
        elif isinstance(message, ResultMessage):
            result_message = message
            append_result_message(message, output_lines, include_result=False)

    return result_message, output_lines


# resume後の状態を、Lesson 15のセッション台帳へ追記する関数です。
def update_registry_after_resume(
    registry: dict[str, Any],
    entry: dict[str, Any],
    result_message: ResultMessage,
) -> dict[str, Any]:
    entry["last_resumed_at"] = now_iso()
    entry["last_subtype"] = result_message.subtype
    entry["is_error"] = result_message.is_error
    entry["num_turns"] = result_message.num_turns
    entry["updated_at"] = now_iso()
    entry["last_result_session_id"] = result_message.session_id

    registry["updated_at"] = now_iso()
    return registry


# 保存済みsession_idを読み込み、ClaudeSDKClientで会話を再開する関数です。
async def resume_saved_session() -> None:
    registry = load_registry()
    entry = find_session_entry(registry, USER_ID)
    session_id = str(entry["session_id"])

    print_section("Resume target")
    print(f"user_id: {USER_ID}")
    print(f"session_id: {session_id}")
    print(f"cwd: {entry.get('cwd')}")

    async with ClaudeSDKClient(options=build_resume_options(session_id)) as client:
        await client.query(FOLLOW_UP_PROMPT)
        result_message, transcript_lines = await receive_response(client)

    if result_message is None:
        raise RuntimeError("ResultMessageを受け取れなかったため、resume結果を保存できません。")

    updated_registry = update_registry_after_resume(registry, entry, result_message)

    transcript = [
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

    write_json_file(SESSION_REGISTRY_PATH, updated_registry)
    write_text_lines(RESUME_TRANSCRIPT_PATH, transcript)

    print_section("Saved resume result")
    print(f"registry: {SESSION_REGISTRY_PATH}")
    print(f"transcript: {RESUME_TRANSCRIPT_PATH}")


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    asyncio.run(resume_saved_session())


if __name__ == "__main__":
    main()
