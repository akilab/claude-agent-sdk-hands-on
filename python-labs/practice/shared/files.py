import json
from pathlib import Path


# 文字列のリストを、改行区切りのテキストファイルとして保存する関数です。
def write_text_lines(path: Path, lines: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# Pythonの辞書やリストを、読みやすいJSONファイルとして保存する関数です。
def write_json_file(path: Path, data: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
