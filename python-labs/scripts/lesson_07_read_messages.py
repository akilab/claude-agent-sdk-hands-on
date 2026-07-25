import asyncio

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    TextBlock,
    ToolResultBlock,
    ToolUseBlock,
    query,
)

from shared.display import print_section
from shared.files import write_json_file
from shared.paths import PROJECT_ROOT


OUTPUT_PATH = PROJECT_ROOT / "outputs" / "lesson_07_message_records.json"


MEETING_MEMO = """
新しい社内FAQページについて打ち合わせを行った。
公開日は来月第2週を目標にする。
営業チームはよくある質問を10件選ぶ。
法務チームは公開前に表現を確認する。
開発チームは検索しやすいページ構成を検討する。
""".strip()


# Agentに依頼するプロンプトを作る関数です。
def build_prompt() -> str:
    return f"""
次の会議メモを、決定事項とTODOに分けて日本語で整理してください。
TODOは担当チームが分かるようにしてください。

会議メモ:
{MEETING_MEMO}
""".strip()


# content blockをJSON保存しやすい辞書へ変換する関数です。
def block_to_record(block: object) -> dict[str, object]:
    block_type = type(block).__name__

    if isinstance(block, TextBlock):
        return {
            "block_type": block_type,
            "text": block.text,
        }

    if isinstance(block, ToolUseBlock):
        return {
            "block_type": block_type,
            "tool_name": block.name,
            "tool_input": block.input,
        }

    if isinstance(block, ToolResultBlock):
        return {
            "block_type": block_type,
            "tool_use_id": block.tool_use_id,
            "is_error": block.is_error,
            "content": block.content,
        }

    return {
        "block_type": block_type,
        "summary": str(block),
    }


# AssistantMessageの内容を表示し、保存用の辞書へ変換する関数です。
def handle_assistant_message(message: AssistantMessage) -> dict[str, object]:
    print_section("AssistantMessage")
    print(f"message type: {type(message).__name__}")
    print(f"model: {message.model}")

    blocks = []
    for index, block in enumerate(message.content, start=1):
        record = block_to_record(block)
        blocks.append(record)

        print(f"block {index}: {record['block_type']}")
        if "text" in record:
            print(record["text"])
        elif "tool_name" in record:
            print(f"tool: {record['tool_name']}")

    return {
        "message_type": type(message).__name__,
        "model": message.model,
        "blocks": blocks,
    }


# ResultMessageの内容を表示し、保存用の辞書へ変換する関数です。
def handle_result_message(message: ResultMessage) -> dict[str, object]:
    print_section("ResultMessage")
    print(f"message type: {type(message).__name__}")
    print(f"subtype: {message.subtype}")
    print(f"is_error: {message.is_error}")
    print(f"num_turns: {message.num_turns}")
    print(f"duration_ms: {message.duration_ms}")
    print(f"session_id: {message.session_id}")

    if message.result:
        print()
        print(message.result)

    return {
        "message_type": type(message).__name__,
        "subtype": message.subtype,
        "is_error": message.is_error,
        "num_turns": message.num_turns,
        "duration_ms": message.duration_ms,
        "session_id": message.session_id,
        "total_cost_usd": message.total_cost_usd,
        "usage": message.usage,
        "result": message.result,
    }


# 届いたメッセージの型に応じて、処理する関数を切り替える関数です。
def handle_message(message: object) -> dict[str, object]:
    message_type = type(message).__name__

    if isinstance(message, AssistantMessage):
        return handle_assistant_message(message)

    if isinstance(message, ResultMessage):
        return handle_result_message(message)

    print_section(message_type)
    print("このレッスンでは詳細表示しないメッセージです。")
    return {
        "message_type": message_type,
        "summary": str(message),
    }


# メッセージ型ごとの件数を表示する関数です。
def print_summary(records: list[dict[str, object]]) -> None:
    counts = {}
    for record in records:
        message_type = str(record["message_type"])
        counts[message_type] = counts.get(message_type, 0) + 1

    print_section("Summary")
    for message_type, count in counts.items():
        print(f"{message_type}: {count}")


# queryを呼び出し、メッセージごとの詳細を保存する関数です。
async def run_agent() -> None:
    options = ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=5,
        disallowed_tools=["Edit", "Write", "Bash"],
    )
    prompt = build_prompt()
    records = []

    print_section("Prompt")
    print(prompt)

    async for message in query(
        prompt=prompt,
        options=options,
    ):
        record = handle_message(message)
        records.append(record)

    write_json_file(OUTPUT_PATH, records)

    print_section("Saved Records")
    print(f"Saved: {OUTPUT_PATH}")
    print_summary(records)


# 非同期のrun_agent関数をイベントループで実行する関数です。
def main() -> None:
    asyncio.run(run_agent())


if __name__ == "__main__":
    main()


