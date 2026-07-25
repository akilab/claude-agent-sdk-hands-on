import asyncio
import json

from claude_agent_sdk import (
    AgentDefinition,
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    query,
)

from shared.display import print_section
from shared.files import write_json_file
from shared.logs import build_run_log
from shared.messages import print_assistant_message
from shared.paths import OUTPUT_DIR, PROJECT_ROOT


SKILL_PATH = PROJECT_ROOT / ".claude" / "skills" / "faq-review" / "SKILL.md"
STRUCTURED_OUTPUT_PATH = OUTPUT_DIR / "lesson_12_release_review.json"
RUN_LOG_PATH = OUTPUT_DIR / "lesson_12_run_log.json"


# 最終レッスンでは、公開前FAQの小さな業務自動化を作ります。
# 入力はPython内の文字列、判断基準はLesson 10で作ったSkill、
# 専門レビューはLesson 11で学んだサブエージェント、
# 最終出力はLesson 09で学んだ構造化出力として保存します。
FAQ_DRAFT = """
FAQ: 請求書ダウンロード機能

Q. 新しい機能はいつ使えますか？
A. 来月から必ず全ユーザーが使えます。

Q. 過去の請求書も見られますか？
A. すべての過去請求書を確認できます。

Q. ダウンロードに失敗した場合はどうしますか？
A. サポートチームに連絡してください。

Q. 請求書データはどのくらい保存されますか？
A. 保存期間は現在確認中です。
""".strip()


# Agentに最終的に作ってほしいJSONのイメージです。
#
# {
#   "summary": "レビュー全体の短い要約",
#   "release_readiness": "ready / needs_changes / blocked のどれか",
#   "risk_items": [
#     {
#       "area": "リスクの領域",
#       "issue": "問題になりそうな表現や内容",
#       "recommendation": "修正案や確認案",
#       "owner": "次に確認すべき担当"
#     }
#   ],
#   "next_actions": [
#     {
#       "team": "担当チーム",
#       "action": "次に行う作業",
#       "priority": "high / medium / low のどれか"
#     }
#   ],
#   "subagent_used": true
# }
#
# OUTPUT_SCHEMAは、上のJSONをClaudeに返してもらうための設計図です。
# 「文章をあとからPythonでJSON化する」のではなく、
# Agent SDKの構造化出力としてResultMessage.structured_outputに入る形を指定します。
OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {
            "type": "string",
            "description": "公開前レビュー全体の短い要約",
        },
        "release_readiness": {
            "type": "string",
            "enum": ["ready", "needs_changes", "blocked"],
            "description": "現時点の公開判断",
        },
        "risk_items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "area": {"type": "string"},
                    "issue": {"type": "string"},
                    "recommendation": {"type": "string"},
                    "owner": {"type": "string"},
                },
                "required": ["area", "issue", "recommendation", "owner"],
            },
            "description": "公開前に確認すべきリスク項目",
        },
        "next_actions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "team": {"type": "string"},
                    "action": {"type": "string"},
                    "priority": {
                        "type": "string",
                        "enum": ["high", "medium", "low"],
                    },
                },
                "required": ["team", "action", "priority"],
            },
            "description": "公開前に行う次アクション",
        },
        "subagent_used": {
            "type": "boolean",
            "description": "faq-risk-reviewerサブエージェントを使ったかどうか",
        },
    },
    "required": [
        "summary",
        "release_readiness",
        "risk_items",
        "next_actions",
        "subagent_used",
    ],
}


# Lesson 10で作ったSkillファイルがあるか確認する関数です。
def ensure_skill_file() -> None:
    if SKILL_PATH.exists():
        return

    raise FileNotFoundError(
        "Skill file was not found. "
        "Create python-labs/.claude/skills/faq-review/SKILL.md first."
    )


# この業務自動化で使うサブエージェント定義を作る関数です。
def build_agents() -> dict[str, AgentDefinition]:
    return {
        "faq-risk-reviewer": AgentDefinition(
            description=(
                "公開前の日本語FAQを読み、断定が強すぎる表現、"
                "未確定仕様、法務確認が必要そうな箇所をレビューします。"
            ),
            prompt=(
                "あなたは公開前FAQのリスクレビュー担当です。"
                "faq-review Skillの観点を使い、断定表現、未確定仕様、"
                "法務確認、担当チームの次アクションを日本語で整理してください。"
                "親Agentが構造化出力へまとめやすいよう、根拠を短く明確にしてください。"
            ),
            # skillsにSkill名を指定すると、サブエージェント起動時にそのSkill内容を読み込ませます。
            # tools=[]なので、サブエージェントは実行中にファイル操作やコマンド実行をしません。
            skills=["faq-review"],
            tools=[],
            maxTurns=3,
        ),
    }


# 親Agentに依頼するプロンプトを作る関数です。
def build_prompt() -> str:
    return f"""
faq-risk-reviewer サブエージェントを使って、次のFAQ原稿を公開前レビューしてください。

必ず行うこと:
- faq-risk-reviewer にレビューを依頼する
- 返ってきた指摘を、公開判断、リスク、次アクションに整理する
- 最終回答は指定されたJSON Schemaに合う構造化出力にする
- subagent_used は true にする

FAQ原稿:
{FAQ_DRAFT}
""".strip()


# 親AgentのOptionsを作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=8,
        # projectを含めると、python-labs/.claude/skills/ が検出対象になります。
        setting_sources=["project"],
        # 親Agentには、サブエージェントを呼ぶAgent toolだけを許可します。
        allowed_tools=["Agent"],
        # 今回は教材を安全に保つため、ファイル操作やコマンド実行は使わせません。
        disallowed_tools=["Read", "Glob", "Edit", "Write", "Bash"],
        permission_mode="dontAsk",
        agents=build_agents(),
        # output_formatは、最終結果をResultMessage.structured_outputで受け取るための設定です。
        output_format={
            "type": "json_schema",
            "schema": OUTPUT_SCHEMA,
        },
    )


# 親Agentを起動し、サブエージェントの結果を構造化JSONとして保存する関数です。
async def run_agent() -> None:
    ensure_skill_file()

    options = build_options()
    prompt = build_prompt()
    final_result = None
    structured_output = None

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
            print_assistant_message(message)
        elif isinstance(message, ResultMessage):
            final_result = message
            structured_output = message.structured_output

    if final_result is None:
        raise RuntimeError("ResultMessage was not received.")

    run_log = build_run_log(final_result, structured_output)

    if structured_output is not None:
        write_json_file(STRUCTURED_OUTPUT_PATH, structured_output)
    write_json_file(RUN_LOG_PATH, run_log)

    print_section("Structured output")
    if structured_output is None:
        print("No structured output was returned.")
    else:
        print(json.dumps(structured_output, ensure_ascii=False, indent=2))

    print_section("Saved files")
    print(STRUCTURED_OUTPUT_PATH)
    print(RUN_LOG_PATH)


# 非同期のrun_agent関数をイベントループで実行する関数です。
def main() -> None:
    asyncio.run(run_agent())


if __name__ == "__main__":
    main()


