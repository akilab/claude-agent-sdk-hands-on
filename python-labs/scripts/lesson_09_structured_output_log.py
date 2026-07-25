import asyncio
import json

from claude_agent_sdk import (
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


STRUCTURED_OUTPUT_PATH = OUTPUT_DIR / "lesson_09_structured_output.json"
RUN_LOG_PATH = OUTPUT_DIR / "lesson_09_run_log.json"


# このレッスンでは、下の会議メモをAgentに読ませます。
# Agentには自由な文章で感想を書かせるのではなく、
# 後でPythonから扱いやすいJSONに整理してもらいます。
MEETING_MEMO = """
社内FAQページの公開準備について打ち合わせを行った。
公開日は来月第2週を目標にする。
営業チームは、よくある質問を10件選ぶ。
法務チームは、公開前に表現を確認する。
開発チームは、検索しやすいページ構成を検討する。
サポートチームは、公開後の問い合わせ窓口を準備する。
未確定の仕様はFAQに断定表現で書かない。
""".strip()


# Agentに最終的に作ってほしいJSONのイメージです。
#
# {
#   "summary": "会議メモ全体の短い要約",
#   "decisions": [
#     "決定事項を文字列で並べる"
#   ],
#   "todos": [
#     {
#       "team": "担当チーム名",
#       "task": "そのチームが行う作業",
#       "priority": "high / medium / low のどれか"
#     }
#   ],
#   "risks": [
#     "注意すべき点や未確定事項を文字列で並べる"
#   ]
# }
#
# OUTPUT_SCHEMAは、このJSONの形をAgent SDKに伝えるための設計図です。
# Pythonの辞書として書いていますが、中身はJSON Schemaのルールです。
OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {
            "type": "string",
            "description": "会議メモ全体の短い要約",
        },
        "decisions": {
            "type": "array",
            "items": {"type": "string"},
            "description": "決定事項の一覧",
        },
        "todos": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "team": {"type": "string"},
                    "task": {"type": "string"},
                    "priority": {
                        "type": "string",
                        "enum": ["high", "medium", "low"],
                    },
                },
                "required": ["team", "task", "priority"],
            },
            "description": "担当チームごとのTODO",
        },
        "risks": {
            "type": "array",
            "items": {"type": "string"},
            "description": "注意すべきリスクや未確定事項",
        },
    },
    "required": ["summary", "decisions", "todos", "risks"],
}


# 構造化出力を得るためのOptionsを作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        cwd=str(PROJECT_ROOT),
        max_turns=2,
        # このレッスンはスキーマ指定に集中するため、ツールは使わせません。
        # 会議メモはPython文字列としてプロンプトに入れるので、Readも不要です。
        disallowed_tools=["Read", "Glob", "Edit", "Write", "Bash"],
        # output_formatは、Agentの最終回答の形を指定する設定です。
        # typeにjson_schemaを指定し、schemaに上で定義したOUTPUT_SCHEMAを渡します。
        output_format={
            "type": "json_schema",
            "schema": OUTPUT_SCHEMA,
        },
    )


# Agentに依頼するプロンプトを作る関数です。
def build_prompt() -> str:
    return f"""
次の会議メモを読み、JSON Schemaに合う形で構造化してください。
TODOのpriorityは high / medium / low のいずれかにしてください。

会議メモ:
{MEETING_MEMO}
""".strip()


# queryを呼び出し、構造化出力とログを保存する関数です。
async def run_agent() -> None:
    options = build_options()
    prompt = build_prompt()
    final_result = None
    structured_output = None

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


