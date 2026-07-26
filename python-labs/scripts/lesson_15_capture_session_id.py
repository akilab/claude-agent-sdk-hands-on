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
CONVERSATION_TITLE = "ClaudeSDKClient session capture"
SESSION_REGISTRY_PATH = OUTPUT_DIR / "lesson_15_session_registry.json"
TRANSCRIPT_DIR = OUTPUT_DIR / "lesson_15_transcripts"

PROMPT = (
    "Claude Agent SDKをPythonで学ぶ人に向けて、"
    "セッションIDを保存する理由を3文で説明してください。"
)


# UTCの現在時刻を、JSONに保存しやすい文字列にする関数です。
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ClaudeSDKClientに渡す実行設定を作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        system_prompt=(
            "あなたはClaude Agent SDKを学ぶ日本語教材の補助者です。"
            "短く、実務に結びつけて説明してください。"
        ),
        disallowed_tools=["Read", "Glob", "Grep", "Write", "Edit", "Bash"],
        max_turns=2,
    )


# 既存のセッション台帳JSONを読み込む関数です。
def load_registry() -> dict[str, Any]:
    if not SESSION_REGISTRY_PATH.exists():
        return {
            "version": 1,
            "updated_at": now_iso(),
            "users": [],
        }

    return json.loads(SESSION_REGISTRY_PATH.read_text(encoding="utf-8"))


# session_idごとに分けたtranscriptファイルの保存先を作る関数です。
def build_transcript_path(session_id: str):
    file_name = f"{session_id}.txt"
    return TRANSCRIPT_DIR / file_name


# セッション台帳に保存する、1会話分の辞書を作る関数です。
def build_session_record(
    result_message: ResultMessage,
    transcript_path: str,
) -> dict[str, Any]:
    return {
        "session_id": result_message.session_id,
        "title": CONVERSATION_TITLE,
        "cwd": str(PROJECT_ROOT),
        "transcript_path": transcript_path,
        "last_subtype": result_message.subtype,
        "is_error": result_message.is_error,
        "num_turns": result_message.num_turns,
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }


# 台帳から指定したuser_idのユーザー記録を探す関数です。
def find_user_record(
    registry: dict[str, Any],
    user_id: str,
) -> dict[str, Any] | None:
    users = registry.get("users", [])

    for user_record in users:
        if user_record.get("user_id") == user_id:
            return user_record

    return None


# ユーザー記録に、1会話分のセッション記録を追加または更新する関数です。
def upsert_session_record(
    user_record: dict[str, Any],
    session_record: dict[str, Any],
) -> None:
    if "sessions" not in user_record:
        user_record["sessions"] = []

    sessions = user_record["sessions"]

    for index, saved_session in enumerate(sessions):
        if saved_session.get("session_id") == session_record["session_id"]:
            sessions[index] = session_record
            return

    sessions.append(session_record)


# user_idごとに複数のsession_idを持てる形で、台帳を更新する関数です。
def upsert_user_session(
    registry: dict[str, Any],
    user_id: str,
    session_record: dict[str, Any],
) -> dict[str, Any]:
    user_record = find_user_record(registry, user_id)

    if user_record is None:
        user_record = {
            "user_id": user_id,
            "sessions": [],
        }

        if "users" not in registry:
            registry["users"] = []

        registry["users"].append(user_record)

    upsert_session_record(user_record, session_record)
    registry["version"] = 1
    registry["updated_at"] = now_iso()
    return registry


# Agentからの1回分の応答を最後まで読み、ResultMessageと表示用テキストを返す関数です。
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
        raise RuntimeError("ResultMessageを受け取れなかったため、session_idを保存できません。")

    return result_message, output_lines


# ClaudeSDKClientでqueryを送り、Agentの応答を受け取る関数です。
async def run_agent():
    async with ClaudeSDKClient(options=build_options()) as client:
        await client.query(PROMPT)
        return await receive_response(client)


# ResultMessageから保存用レコードを作り、JSON台帳とtranscriptを書き込む関数です。
def save_session_to_registry(
    result_message: ResultMessage,
    transcript_lines: list[str],
) -> dict[str, Any]:
    transcript_path = build_transcript_path(result_message.session_id)
    session_record = build_session_record(
        result_message,
        str(transcript_path),
    )
    registry = upsert_user_session(load_registry(), USER_ID, session_record)

    write_json_file(SESSION_REGISTRY_PATH, registry)
    write_text_lines(transcript_path, transcript_lines)
    return session_record


# 新しいAgentセッションを作り、そのsession_idをアプリ側の台帳へ保存する関数です。
async def create_session_and_save_registry() -> None:
    print_section("Prompt")
    print(PROMPT)

    agent_response = await run_agent()
    if agent_response is None:
        raise RuntimeError("Agentの応答を受け取れませんでした。")

    result_message = agent_response[0]
    transcript_lines = agent_response[1]
    session_record = save_session_to_registry(result_message, transcript_lines)

    print_section("Saved session")
    print(f"user_id: {USER_ID}")
    print(f"session_id: {session_record['session_id']}")
    print(f"registry: {SESSION_REGISTRY_PATH}")
    print(f"transcript: {session_record['transcript_path']}")


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    asyncio.run(create_session_and_save_registry())


if __name__ == "__main__":
    main()
