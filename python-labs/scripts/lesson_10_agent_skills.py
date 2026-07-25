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


SKILL_PATH = PROJECT_ROOT / ".claude" / "skills" / "faq-review" / "SKILL.md"
OUTPUT_PATH = PROJECT_ROOT / "outputs" / "lesson_10_skill_review.txt"


# Agentに確認してもらうFAQ原稿です。
# ファイルに保存せず、プロンプト内の文字列として渡します。
FAQ_DRAFT = """
FAQ: 新しい請求書ダウンロード機能について

Q. いつから請求書をダウンロードできますか？
A. 来月から必ず利用できます。

Q. 過去の請求書も確認できますか？
A. すべての過去請求書を確認できます。

Q. 問い合わせ先はどこですか？
A. 不明点はサポートチームへ連絡してください。
""".strip()


# Skillファイルが事前に作成されているか確認する関数です。
def ensure_skill_file() -> None:
    if SKILL_PATH.exists():
        return

    raise FileNotFoundError(
        "Skill file was not found. "
        "Create python-labs/.claude/skills/faq-review/SKILL.md first."
    )


# Agentに依頼するプロンプトを作る関数です。
def build_prompt() -> str:
    return f"""
faq-review Skillを使って、次の社内FAQ原稿を公開前レビューしてください。

確認してほしい観点:
- 断定が強すぎる表現
- 法務確認が必要そうな箇所
- 担当チームごとの次アクション
- より安全な言い換え

FAQ原稿:
{FAQ_DRAFT}
""".strip()


# Project Skillを読み込むためのOptionsを作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=4,
        # projectを含めると、cwd配下の .claude/skills/ が読み込まれます。
        setting_sources=["project"],
        # 今回は事前に用意したfaq-reviewだけを有効にします。
        # すべてのSkillを有効にしたい場合は、リストではなく skills="all" と書きます。
        # skills=["all"] は、「all」という名前のSkillを指定する形になり得るため別物です。
        skills=["faq-review"],
        # FAQ原稿はプロンプトに入れるので、ファイル読み書きやコマンド実行は不要です。
        disallowed_tools=["Read", "Glob", "Edit", "Write", "Bash"],
    )


# 事前に作成したSkillを有効化し、Agentを実行する関数です。
async def run_agent() -> None:
    ensure_skill_file()

    options = build_options()
    prompt = build_prompt()
    output_lines = []

    print_section("Skill file")
    print(SKILL_PATH)

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


