import asyncio

from claude_agent_sdk import (
    AgentDefinition,
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    query,
)

from shared.display import print_section
from shared.files import write_text_lines
from shared.messages import append_result_message, print_assistant_message
from shared.paths import PROJECT_ROOT


OUTPUT_PATH = PROJECT_ROOT / "outputs" / "lesson_11_subagent_review.txt"


# サブエージェントにレビューしてもらうFAQ原稿です。
# 今回も、教材を短く保つためファイルではなく文字列として渡します。
FAQ_DRAFT = """
FAQ: 請求書ダウンロード機能

Q. 新しい機能はいつ使えますか？
A. 来月から必ず全ユーザーが使えます。

Q. 過去の請求書も見られますか？
A. すべての過去請求書を確認できます。

Q. ダウンロードできない場合はどうしますか？
A. サポートチームに連絡してください。
""".strip()


# この実行で使うサブエージェント定義を作る関数です。
def build_agents() -> dict[str, AgentDefinition]:
    return {
        "faq-risk-reviewer": AgentDefinition(
            description=(
                "公開前の日本語FAQを読み、断定が強すぎる表現、"
                "未確定仕様、法務確認が必要そうな箇所をレビューします。"
            ),
            prompt=(
                "あなたは公開前FAQのリスクレビュー担当です。"
                "原稿を読み、断定が強すぎる表現、未確定に見える仕様、"
                "法務確認が必要そうな箇所、より安全な言い換えを日本語で整理してください。"
                "必要以上に長くせず、実務担当者が次に動ける形で答えてください。"
            ),
            # サブエージェントにツールを使わせない設定です。
            # 今回はプロンプトに入れた文章だけをレビューするため、ツールは不要です。
            tools=[],
            # AgentDefinitionでは、公式ドキュメントに合わせてmaxTurnsのようなcamelCaseを使います。
            maxTurns=2,
        ),
    }


# 親Agentに依頼するプロンプトを作る関数です。
def build_prompt() -> str:
    return f"""
faq-risk-reviewer サブエージェントを使って、次のFAQ原稿を公開前レビューしてください。

親Agentの役割:
- サブエージェントにレビューを依頼する
- 返ってきた指摘を、担当者が読みやすい形で短くまとめる

FAQ原稿:
{FAQ_DRAFT}
""".strip()


# サブエージェントを使うためのOptionsを作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=6,
        # Agent toolを許可すると、親Agentがサブエージェントを呼び出せます。
        allowed_tools=["Agent"],
        # 今回はファイル操作やコマンド実行は不要です。
        disallowed_tools=["Read", "Glob", "Edit", "Write", "Bash"],
        permission_mode="dontAsk",
        agents=build_agents(),
    )


# 親Agentを起動し、サブエージェントのレビュー結果を保存する関数です。
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
            append_result_message(message, output_lines)

    write_text_lines(OUTPUT_PATH, output_lines)

    print_section("Saved output")
    print(OUTPUT_PATH)


# 非同期のrun_agent関数をイベントループで実行する関数です。
def main() -> None:
    asyncio.run(run_agent())


if __name__ == "__main__":
    main()


