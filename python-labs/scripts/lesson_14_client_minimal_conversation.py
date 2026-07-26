import asyncio

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ClaudeSDKClient,
    ResultMessage,
)

from shared.display import print_section, record_line
from shared.files import write_text_lines
from shared.messages import append_result_message, print_assistant_message
from shared.paths import OUTPUT_DIR


PROMPTS = [
    (
        "1回目の質問",
        "PythonでAgent SDKを学ぶ人に向けて、ClaudeSDKClientを一文で説明してください。",
    ),
    (
        "2回目の質問",
        "先ほどの説明を前提に、query()との違いを二つの箇条書きで説明してください。",
    ),
]

OUTPUT_PATH = OUTPUT_DIR / "lesson_14_client_conversation.txt"


# ClaudeSDKClientに渡す実行設定を作る関数です。
def build_options() -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        system_prompt=(
            "あなたはClaude Agent SDKを学ぶ日本語教材の補助者です。"
            "短く、具体的に、初学者にも分かる言葉で答えてください。"
        ),
        disallowed_tools=["Read", "Glob", "Grep", "Write", "Edit", "Bash"],
        max_turns=2,
    )


# 1回分の問い合わせに対するメッセージを最後まで読む関数です。
async def receive_current_response(
    client: ClaudeSDKClient,
    label: str,
) -> tuple[ResultMessage | None, list[str]]:
    result_message = None
    output_lines: list[str] = []

    record_line(output_lines, "=" * 72)
    record_line(output_lines, label)
    record_line(output_lines, "=" * 72)

    async for message in client.receive_response():
        if isinstance(message, AssistantMessage):
            print_assistant_message(message, output_lines)
        elif isinstance(message, ResultMessage):
            result_message = message
            append_result_message(message, output_lines, include_result=False)

    print("\n".join(output_lines))
    return result_message, output_lines


# 同じClaudeSDKClientで2回問い合わせ、同じセッションが続くことを確認する関数です。
async def run_conversation() -> None:
    options = build_options()
    session_ids: list[str] = []
    conversation_lines: list[str] = []

    print_section("ClaudeSDKClient conversation")

    async with ClaudeSDKClient(options=options) as client:
        for label, prompt in PROMPTS:
            print_section(label)
            print(prompt)

            await client.query(prompt)
            result_message, response_lines = await receive_current_response(client, label)
            conversation_lines.extend(response_lines)
            conversation_lines.append("")

            if result_message is not None:
                session_ids.append(result_message.session_id)

    output_lines = [
        "ClaudeSDKClient conversation summary",
        "",
        "Observed session IDs:",
        *session_ids,
        "",
        "If the same client continued the conversation, the session IDs should match.",
        "",
        "Conversation output:",
        *conversation_lines,
    ]
    write_text_lines(OUTPUT_PATH, output_lines)

    print_section("Saved")
    print(OUTPUT_PATH)


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    asyncio.run(run_conversation())


if __name__ == "__main__":
    main()
