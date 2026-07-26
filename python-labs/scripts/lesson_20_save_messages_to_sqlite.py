import asyncio
from datetime import datetime, timezone

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ClaudeSDKClient,
    ResultMessage,
)

from shared.database import (
    connect_database,
    count_rows,
    create_schema,
    fetch_message_summary,
    insert_message,
    insert_session_if_missing,
    require_user_exists,
)
from shared.display import print_section
from shared.messages import print_assistant_message
from shared.paths import PROJECT_ROOT


USER_ID = "learner-001"
CONVERSATION_TITLE = "ClaudeSDKClient message persistence"
PROMPT = (
    "ClaudeSDKClientで会話メッセージをDBに保存する理由を、"
    "Webアプリ開発者向けに3文で説明してください。"
)


# UTCの現在時刻を、SQLiteに保存しやすい文字列にする関数です。
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ClaudeSDKClientに渡す実行設定を作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        system_prompt=(
            "あなたはClaude Agent SDKを学ぶ日本語教材の補助者です。"
            "短く、Webアプリ開発の文脈に結びつけて説明してください。"
        ),
        disallowed_tools=["Read", "Glob", "Grep", "Write", "Edit", "Bash"],
        max_turns=2,
    )


# AssistantMessage.contentの各ブロックから、表示できるテキストを取り出す関数です。
def collect_assistant_text(message: AssistantMessage) -> str:
    text_parts: list[str] = []

    for block in message.content:
        text = getattr(block, "text", None)
        if text:
            text_parts.append(str(text))

    return "\n".join(text_parts)


# Agentからの1回分の応答を最後まで読み、本文とResultMessageを返す関数です。
async def receive_response(client: ClaudeSDKClient):
    result_message: ResultMessage | None = None
    assistant_texts: list[str] = []

    async for message in client.receive_response():
        if isinstance(message, AssistantMessage):
            text = collect_assistant_text(message)
            if text:
                assistant_texts.append(text)
            print_assistant_message(message)
        elif isinstance(message, ResultMessage):
            result_message = message

    if result_message is None:
        raise RuntimeError("ResultMessageを受け取れなかったため、DBへ保存できません。")

    return "\n\n".join(assistant_texts), result_message


# ClaudeSDKClientで1回問い合わせ、会話本文とsession_idを含む結果を受け取る関数です。
async def run_agent():
    async with ClaudeSDKClient(options=build_options()) as client:
        await client.query(PROMPT)
        return await receive_response(client)


# ResultMessageから、sessionsテーブルに登録する1会話分の辞書を作る関数です。
def build_session_record(result_message: ResultMessage) -> dict[str, str]:
    timestamp = now_iso()

    return {
        "session_id": result_message.session_id,
        "title": CONVERSATION_TITLE,
        "cwd": str(PROJECT_ROOT),
        "created_at": timestamp,
        "updated_at": timestamp,
    }


# 1回のAgent実行結果を、sessionsとmessagesへ保存する関数です。
def save_conversation_to_database(
    user_prompt: str,
    assistant_text: str,
    result_message: ResultMessage,
) -> None:
    session_record = build_session_record(result_message)
    claude_session_id = session_record["session_id"]

    with connect_database() as connection:
        create_schema(connection)
        require_user_exists(connection, USER_ID)

        insert_session_if_missing(connection, USER_ID, session_record)
        insert_message(connection, claude_session_id, "user", user_prompt, 1, now_iso())
        insert_message(connection, claude_session_id, "assistant", assistant_text, 2, now_iso())

        connection.commit()

        print_section("Saved to database")
        print(f"user_id: {USER_ID}")
        print(f"session_id: {claude_session_id}")
        print(f"result_subtype: {result_message.subtype}")
        print(f"num_turns: {result_message.num_turns}")
        print(f"sessions: {count_rows(connection, 'sessions')}")
        print(f"messages: {count_rows(connection, 'messages')}")

        print_section("Saved messages")
        for message in fetch_message_summary(connection, claude_session_id):
            print(f"- turn {message['turn_number']} / {message['role']}: {message['preview']}")


# 新しい会話を実行し、結果をSQLiteへ保存する全体の流れをまとめる関数です。
async def create_conversation_and_save_messages() -> None:
    print_section("Prompt")
    print(PROMPT)

    assistant_text, result_message = await run_agent()
    save_conversation_to_database(PROMPT, assistant_text, result_message)


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    asyncio.run(create_conversation_and_save_messages())


if __name__ == "__main__":
    main()
