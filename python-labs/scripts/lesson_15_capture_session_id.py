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
TRANSCRIPT_PATH = OUTPUT_DIR / "lesson_15_session_transcript.txt"

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
            "sessions": [],
        }

    return json.loads(SESSION_REGISTRY_PATH.read_text(encoding="utf-8"))


# セッション台帳に保存する1件分の辞書を作る関数です。
def build_session_entry(result_message: ResultMessage) -> dict[str, Any]:
    return {
        "user_id": USER_ID,
        "title": CONVERSATION_TITLE,
        "session_id": result_message.session_id,
        "cwd": str(PROJECT_ROOT),
        "last_subtype": result_message.subtype,
        "is_error": result_message.is_error,
        "num_turns": result_message.num_turns,
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }


# 同じuser_idの古い記録を置き換え、台帳を最新状態にする関数です。
def upsert_session_entry(
    registry: dict[str, Any],
    entry: dict[str, Any],
) -> dict[str, Any]:
    sessions = registry.get("sessions", [])
    kept_sessions = [
        session
        for session in sessions
        if session.get("user_id") != entry["user_id"]
    ]

    registry["version"] = 1
    registry["updated_at"] = now_iso()
    registry["sessions"] = [*kept_sessions, entry]
    return registry


# Agentからの1回分の応答を最後まで読み、ResultMessageを取り出す関数です。
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


# ClaudeSDKClientで問い合わせ、ResultMessage.session_idを台帳へ保存する関数です。
async def capture_session_id() -> None:
    print_section("Prompt")
    print(PROMPT)

    async with ClaudeSDKClient(options=build_options()) as client:
        await client.query(PROMPT)
        result_message, transcript_lines = await receive_response(client)

    if result_message is None:
        raise RuntimeError("ResultMessageを受け取れなかったため、session_idを保存できません。")

    session_entry = build_session_entry(result_message)
    registry = upsert_session_entry(load_registry(), session_entry)

    write_json_file(SESSION_REGISTRY_PATH, registry)
    write_text_lines(TRANSCRIPT_PATH, transcript_lines)

    print_section("Saved session")
    print(f"user_id: {session_entry['user_id']}")
    print(f"session_id: {session_entry['session_id']}")
    print(f"registry: {SESSION_REGISTRY_PATH}")
    print(f"transcript: {TRANSCRIPT_PATH}")


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    asyncio.run(capture_session_id())


if __name__ == "__main__":
    main()
