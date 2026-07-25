from claude_agent_sdk import AssistantMessage, ResultMessage

from shared.display import record_line


# AssistantMessageの途中応答から表示できる情報を取り出す関数です。
def print_assistant_message(
    message: AssistantMessage,
    output_lines: list[str] | None = None,
) -> None:
    for block in message.content:
        text = getattr(block, "text", None)
        name = getattr(block, "name", None)

        if text:
            if output_lines is None:
                print(text)
            else:
                record_line(output_lines, text)
        elif name:
            line = f"Tool: {name}"
            if output_lines is None:
                print(line)
            else:
                record_line(output_lines, line)


# ResultMessageから、保存しやすい基本情報の行を作る関数です。
def result_message_lines(
    message: ResultMessage,
    *,
    include_turns: bool = True,
    include_session: bool = True,
    include_result: bool = True,
) -> list[str]:
    lines = [
        f"Done: {message.subtype}",
    ]

    if include_turns:
        lines.append(f"Turns: {message.num_turns}")

    if include_session:
        lines.append(f"Session: {message.session_id}")

    if include_result and message.result:
        lines.append("")
        lines.append(str(message.result))

    return lines


# ResultMessageの基本情報を保存用リストへ追加する関数です。
def append_result_message(
    message: ResultMessage,
    output_lines: list[str],
    *,
    include_turns: bool = True,
    include_session: bool = True,
    include_result: bool = True,
) -> None:
    output_lines.extend(
        result_message_lines(
            message,
            include_turns=include_turns,
            include_session=include_session,
            include_result=include_result,
        )
    )
