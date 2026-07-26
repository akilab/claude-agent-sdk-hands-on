import json
from typing import Any

from shared.database import (
    connect_database,
    count_rows,
    create_schema,
    fetch_session_summary,
    insert_session_if_missing,
    insert_user_if_missing,
)
from shared.display import print_section
from shared.paths import OUTPUT_DIR


SESSION_REGISTRY_PATH = OUTPUT_DIR / "lesson_15_session_registry.json"


# Lesson 15で作ったJSON台帳を読み込む関数です。
def load_registry() -> dict[str, Any]:
    if not SESSION_REGISTRY_PATH.exists():
        raise FileNotFoundError(
            "Lesson 15の台帳が見つかりません。"
            "先に `uv run python scripts/lesson_15_capture_session_id.py` を実行してください。"
        )

    return json.loads(SESSION_REGISTRY_PATH.read_text(encoding="utf-8"))


# ユーザー記録のsessions配列を、安全にリストとして取り出す関数です。
def get_session_records(user_record: dict[str, Any]) -> list[dict[str, Any]]:
    sessions = user_record.get("sessions", [])
    if not isinstance(sessions, list):
        return []
    return sessions


# 1人分のユーザー記録を、usersとsessionsへ登録する関数です。
def import_user_record(
    connection,
    user_record: dict[str, Any],
) -> None:
    user_id = str(user_record["user_id"])
    insert_user_if_missing(connection, user_id)

    for session_record in get_session_records(user_record):
        insert_session_if_missing(connection, user_id, session_record)


# JSON台帳に入っている全ユーザーと全セッションをDBへ登録する関数です。
def import_registry_to_database(
    connection,
    registry: dict[str, Any],
) -> None:
    users = registry.get("users", [])

    for user_record in users:
        import_user_record(connection, user_record)

    connection.commit()


# 登録結果を、ターミナルで読みやすく表示する関数です。
def print_import_summary(connection) -> None:
    print_section("Imported row counts")
    print(f"users: {count_rows(connection, 'users')}")
    print(f"sessions: {count_rows(connection, 'sessions')}")
    print(f"messages: {count_rows(connection, 'messages')}")

    print_section("Session summary")
    for session in fetch_session_summary(connection):
        print(f"- {session['user_id']} / {session['claude_session_id']}")
        print(f"  title: {session['title']}")
        print(f"  updated_at: {session['updated_at']}")


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    registry = load_registry()

    with connect_database() as connection:
        create_schema(connection)
        import_registry_to_database(connection, registry)
        print_import_summary(connection)


if __name__ == "__main__":
    main()
