LESSONS = [
    {
        "id": "01",
        "title": "学習前提と公式情報を確認する",
        "category": "foundation",
        "minutes": 25,
        "outcomes": [
            "契約と認証の前提を確認する",
            "Pythonとuvの状態を確認する",
        ],
    },
    {
        "id": "02",
        "title": "uvでPythonプロジェクトを作る",
        "category": "foundation",
        "minutes": 35,
        "outcomes": [
            "pyproject.tomlの役割を説明する",
            ".venvとuv.lockの扱いを理解する",
        ],
    },
    {
        "id": "03",
        "title": "Pythonの基本を小さく書く",
        "category": "python",
        "minutes": 45,
        "outcomes": [
            "リストと辞書で情報を表現する",
            "関数で処理を小さく分ける",
            "条件分岐と例外処理を使う",
        ],
    },
    {
        "id": "06",
        "title": "最初のPython Agentを動かす",
        "category": "agent-sdk",
        "minutes": 50,
        "outcomes": [
            "query関数を使う",
            "Agentの応答を順に表示する",
        ],
    },
]


# 見出しを区切り線つきで表示する関数です。
def print_section(title: str) -> None:
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


# 分数を「45分」や「2時間35分」のように読みやすく整える関数です。
def format_minutes(minutes: int) -> str:
    hours = minutes // 60
    remaining = minutes % 60

    if hours == 0:
        return f"{remaining}分"

    if remaining == 0:
        return f"{hours}時間"

    return f"{hours}時間{remaining}分"


# 1件のレッスン情報に必要な項目と型が揃っているか確認する関数です。
def validate_lesson(lesson: dict[str, object]) -> None:
    required_keys = {"id", "title", "category", "minutes", "outcomes"}
    missing = required_keys - lesson.keys()

    if missing:
        missing_text = ", ".join(sorted(missing))
        raise ValueError(f"Lesson {lesson.get('id', '?')} is missing: {missing_text}")

    if not isinstance(lesson["minutes"], int):
        raise ValueError(f"Lesson {lesson['id']} minutes must be an integer.")

    if not isinstance(lesson["outcomes"], list):
        raise ValueError(f"Lesson {lesson['id']} outcomes must be a list.")


# すべてのレッスン情報を順番に検証する関数です。
def validate_lessons(lessons: list[dict[str, object]]) -> None:
    for lesson in lessons:
        validate_lesson(lesson)


# レッスン一覧と合計時間を表示する関数です。
def summarize_lessons(lessons: list[dict[str, object]]) -> None:
    print_section("All lessons")

    total_minutes = 0
    for lesson in lessons:
        total_minutes += int(lesson["minutes"])
        minutes_text = format_minutes(int(lesson["minutes"]))
        print(f"Lesson {lesson['id']}: {lesson['title']} ({minutes_text})")

    print(f"Total: {format_minutes(total_minutes)}")


# 指定したカテゴリに一致するレッスンだけを取り出す関数です。
def filter_by_category(
    lessons: list[dict[str, object]],
    selected_category: str,
) -> list[dict[str, object]]:
    filtered_lessons = []

    for lesson in lessons:
        if lesson["category"] == selected_category:
            filtered_lessons.append(lesson)

    return filtered_lessons


# レッスンの詳細と学習成果を表示する関数です。
def show_lesson_details(lessons: list[dict[str, object]]) -> None:
    for lesson in lessons:
        print()
        print(f"Lesson {lesson['id']}: {lesson['title']}")
        print(f"Category: {lesson['category']}")
        print(f"Time: {format_minutes(int(lesson['minutes']))}")
        print("Outcomes:")

        outcomes = lesson["outcomes"]
        if isinstance(outcomes, list):
            for outcome in outcomes:
                print(f"- {outcome}")


# Agentに渡すための短い文脈テキストを組み立てる関数です。
def build_agent_context(lessons: list[dict[str, object]]) -> str:
    lines = [
        "次の学習者に案内するレッスン候補です。",
        "目的に合う順番で、短く提案してください。",
        "",
    ]

    for lesson in lessons:
        minutes_text = format_minutes(int(lesson["minutes"]))
        lines.append(f"- Lesson {lesson['id']}: {lesson['title']} / {minutes_text}")

    return "\n".join(lines)


# Lesson 03の処理全体を順番に実行する関数です。
def main() -> None:
    print("Claude Agent SDK Hands-on / Lesson 03")

    try:
        validate_lessons(LESSONS)
    except ValueError as error:
        print("教材データに確認が必要です。")
        print(error)
        return

    summarize_lessons(LESSONS)

    selected_category = "python"
    python_lessons = filter_by_category(LESSONS, selected_category)

    print_section(f"Category: {selected_category}")
    show_lesson_details(python_lessons)

    print_section("Agent context preview")
    context = build_agent_context(python_lessons)
    print(context)


if __name__ == "__main__":
    main()

