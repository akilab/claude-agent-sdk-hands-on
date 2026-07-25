import asyncio

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    query,
)

from shared.display import print_section
from shared.files import write_text_lines
from shared.messages import print_assistant_message, result_message_lines
from shared.paths import PROJECT_ROOT


OUTPUT_PATH = PROJECT_ROOT / "outputs" / "lesson_06_agent_output.txt"


MEETING_MEMO = """
社内FAQページの公開に向けて打ち合わせを行った。
公開日は来月第2週を目標にする。
営業チームは、よくある質問を10件選ぶ。
法務チームは、公開前に表現を確認する。
開発チームは、検索しやすいページ構成を検討する。
""".strip()


# Agentに依頼する内容を、会議メモつきで組み立てる関数です。
def build_prompt() -> str:
    return f"""
あなたは業務メモを整理するアシスタントです。
次の会議メモを、決定事項とTODOに分けて日本語で整理してください。
TODOは担当チームが分かるようにしてください。

会議メモ:
{MEETING_MEMO}

制約:
- ファイルを読まないでください。
- ファイルを変更しないでください。
- コマンドを実行しないでください。
- 短く、初学者にも分かる言葉で整理してください。
""".strip()


# 最初のAgentを安全に小さく動かすためのOptionsを作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=2,
        disallowed_tools=["Read", "Glob", "Edit", "Write", "Bash"],
    )


# queryを呼び出し、Agentから届くメッセージを順番に処理する関数です。
async def run_agent() -> None:
    options = build_options()
    prompt = build_prompt()
    output_lines = []

    print_section("Prompt")
    print(prompt)

    print_section("Agent output")
    async for message in query(
        prompt=prompt,
        options=options,
    ):
        if isinstance(message, AssistantMessage):
            print_assistant_message(message, output_lines)
        elif isinstance(message, ResultMessage):
            print_section("Result")
            lines = result_message_lines(
                message,
                include_turns=False,
                include_session=False,
            )
            for line in lines:
                print(line)
            output_lines.extend(lines)

    write_text_lines(OUTPUT_PATH, output_lines)

    print_section("Saved output")
    print(f"Saved: {OUTPUT_PATH}")


# 非同期のrun_agent関数をイベントループで実行する関数です。
def main() -> None:
    asyncio.run(run_agent())


if __name__ == "__main__":
    main()


