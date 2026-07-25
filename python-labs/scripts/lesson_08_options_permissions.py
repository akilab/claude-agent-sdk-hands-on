import asyncio

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    query,
)

from shared.display import print_section
from shared.files import write_text_lines
from shared.messages import append_result_message, print_assistant_message
from shared.paths import PROJECT_ROOT


POLICY_PATH = PROJECT_ROOT / "data" / "lesson_08_policy.txt"
OUTPUT_PATH = PROJECT_ROOT / "outputs" / "lesson_08_permission_review.txt"


POLICY_TEXT = """
社内FAQ公開ルール

- 公開前に法務チームが表現を確認する。
- 顧客名、個人情報、契約金額はFAQに掲載しない。
- 未確定の仕様は「予定」と明記する。
- 公開後の修正依頼はサポートチームが受け付ける。
- 緊急の修正は開発チームと法務チームの両方に連絡する。
""".strip()


# Agentが読むための教材ファイルを用意する関数です。
def prepare_policy_file() -> None:
    POLICY_PATH.parent.mkdir(parents=True, exist_ok=True)
    POLICY_PATH.write_text(POLICY_TEXT + "\n", encoding="utf-8")


# 読み取り専用Agentとして動かすためのOptionsを作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=4,
        system_prompt=(
            "あなたは社内文書の確認を支援するアシスタントです。"
            "ファイルの内容を読み、要点と注意点を簡潔に整理してください。"
            "ファイルの作成、編集、削除、コマンド実行は行いません。"
        ),
        allowed_tools=["Read", "Glob"],
        disallowed_tools=["Edit", "Write", "Bash"],
        permission_mode="dontAsk",
    )


# Agentに依頼するプロンプトを作る関数です。
def build_prompt() -> str:
    relative_path = POLICY_PATH.relative_to(PROJECT_ROOT)
    return f"""
`{relative_path}` を読んで、次の形式で日本語で整理してください。

1. 重要なルール
2. 公開前に確認すべき注意点
3. 担当チームごとの見るべきポイント

ファイルの変更やコマンド実行は不要です。
""".strip()


# queryを呼び出し、読み取り専用設定でAgentを動かす関数です。
async def run_agent() -> None:
    prepare_policy_file()
    options = build_options()
    prompt = build_prompt()
    output_lines = []

    print_section("Policy file")
    print(POLICY_PATH)

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
            append_result_message(message, output_lines)

    write_text_lines(OUTPUT_PATH, output_lines)

    print_section("Saved output")
    print(f"Saved: {OUTPUT_PATH}")


# 非同期のrun_agent関数をイベントループで実行する関数です。
def main() -> None:
    asyncio.run(run_agent())


if __name__ == "__main__":
    main()


