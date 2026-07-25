import json
from datetime import datetime
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = PROJECT_ROOT / "data"
OUTPUTS_DIR = PROJECT_ROOT / "outputs"
PROGRESS_PATH = DATA_DIR / "learning_progress.json"
REPORT_PATH = OUTPUTS_DIR / "lesson_04_report.txt"


DEFAULT_PROGRESS = {
    "learner": "business learner",
    "current_lesson": "04",
    "completed_lessons": ["01", "02", "03"],
    "notes": [
        "Pythonとuvの前提を確認した",
        "pyproject.tomlとuv.lockの役割を確認した",
        "リスト、辞書、関数、例外処理を練習した",
    ],
}


# 見出しを区切り線つきで表示する関数です。
def print_section(title: str) -> None:
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


# dataフォルダとoutputsフォルダがなければ作成する関数です。
def ensure_directories() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)


# Pythonの辞書をJSONとしてファイルに保存する関数です。
def write_json(path: Path, data: dict[str, object]) -> None:
    text = json.dumps(data, ensure_ascii=False, indent=2)
    path.write_text(text + "\n", encoding="utf-8")


# JSONファイルを読み込み、なければ初期データを作成して返す関数です。
def read_json(path: Path) -> dict[str, object]:
    try:
        text = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        print(f"INFO: {path.name} がないため、初期データを作成します。")
        write_json(path, DEFAULT_PROGRESS)
        return DEFAULT_PROGRESS.copy()

    try:
        data = json.loads(text)
    except json.JSONDecodeError as error:
        raise ValueError(f"{path.name} はJSONとして読めません: {error}") from error

    if not isinstance(data, dict):
        raise ValueError(f"{path.name} の最上位は辞書である必要があります。")

    return data


# 学習進捗に完了レッスンとメモを追加する関数です。
def add_lesson_note(progress: dict[str, object], lesson_id: str, note: str) -> None:
    completed = progress.setdefault("completed_lessons", [])
    notes = progress.setdefault("notes", [])

    if not isinstance(completed, list):
        raise ValueError("completed_lessons はリストである必要があります。")

    if not isinstance(notes, list):
        raise ValueError("notes はリストである必要があります。")

    if lesson_id not in completed:
        completed.append(lesson_id)

    notes.append(note)
    progress["updated_at"] = datetime.now().isoformat(timespec="seconds")


# 学習進捗の辞書から、人が読みやすいレポート文を作る関数です。
def build_report(progress: dict[str, object]) -> str:
    learner = progress.get("learner", "unknown")
    current_lesson = progress.get("current_lesson", "unknown")
    completed = progress.get("completed_lessons", [])
    notes = progress.get("notes", [])
    updated_at = progress.get("updated_at", "not recorded")

    lines = [
        "Claude Agent SDK Hands-on / Lesson 04 Report",
        "",
        f"Learner: {learner}",
        f"Current lesson: {current_lesson}",
        f"Updated at: {updated_at}",
        "",
        "Completed lessons:",
    ]

    if isinstance(completed, list):
        for lesson_id in completed:
            lines.append(f"- Lesson {lesson_id}")

    lines.append("")
    lines.append("Notes:")

    if isinstance(notes, list):
        for note in notes:
            lines.append(f"- {note}")

    return "\n".join(lines) + "\n"


# Lesson 04のファイル読み書き処理を順番に実行する関数です。
def main() -> None:
    print("Claude Agent SDK Hands-on / Lesson 04")
    ensure_directories()

    try:
        progress = read_json(PROGRESS_PATH)
        add_lesson_note(progress, "04", "ファイル操作と例外処理を練習した")
        write_json(PROGRESS_PATH, progress)
        report = build_report(progress)
        REPORT_PATH.write_text(report, encoding="utf-8")
    except ValueError as error:
        print("学習ログを処理できませんでした。")
        print(error)
        return

    print_section("Files")
    print(f"Progress JSON: {PROGRESS_PATH}")
    print(f"Report text: {REPORT_PATH}")

    print_section("Report preview")
    print(report)


if __name__ == "__main__":
    main()

