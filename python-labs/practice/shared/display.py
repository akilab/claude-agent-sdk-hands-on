# 見出しを区切り線つきで表示する関数です。
def print_section(title: str) -> None:
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


# 画面に表示した内容を、保存用のリストにも追加する関数です。
def record_line(output_lines: list[str], text: str) -> None:
    print(text)
    output_lines.append(text)
