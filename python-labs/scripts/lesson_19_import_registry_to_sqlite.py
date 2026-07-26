import json
import sqlite3
from typing import Any

from lesson_18_create_sqlite_tables import connect_database, create_schema
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


# usersテーブルに、まだ存在しないユーザーだけを追加する関数です。
def insert_user_if_missing(
    connection: sqlite3.Connection,
    user_id: str,
) -> None:
    connection.execute(
        """
        INSERT OR IGNORE INTO users (
            user_id,
            status
        )
        VALUES (?, 'active')
        """,
        (user_id,),
    )


# セッション記録から、必須項目の文字列値を取り出す関数です。
def require_session_value(
    session_record: dict[str, Any],
    key: str,
) -> str:
    value = session_record.get(key)
    if value is None or value == "":
        raise ValueError(f"session_recordに必須項目 {key} がありません。")
    return str(value)


# sessionsテーブルに、まだ存在しないセッションだけを追加する関数です。
def insert_session_if_missing(
    connection: sqlite3.Connection,
    user_id: str,
    session_record: dict[str, Any],
) -> None:
    claude_session_id = require_session_value(session_record, "session_id")
    title = str(session_record.get("title", "Untitled session"))
    cwd = require_session_value(session_record, "cwd")
    created_at = require_session_value(session_record, "created_at")
    updated_at = require_session_value(session_record, "updated_at")
    last_resumed_at = str(session_record.get("last_resumed_at", ""))

    connection.execute(
        """
        INSERT OR IGNORE INTO sessions (
            user_id,
            claude_session_id,
            title,
            cwd,
            created_at,
            updated_at,
            last_resumed_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            user_id,
            claude_session_id,
            title,
            cwd,
            created_at,
            updated_at,
            last_resumed_at,
        ),
    )


# JSON台帳に入っている全ユーザーと全セッションをDBへ登録する関数です。
def import_registry_to_database(
    connection: sqlite3.Connection,
    registry: dict[str, Any],
) -> None:
    users = registry.get("users", [])

    for user_record in users:
        user_id = str(user_record["user_id"])
        insert_user_if_missing(connection, user_id)

        for session_record in get_session_records(user_record):
            insert_session_if_missing(connection, user_id, session_record)

    connection.commit()


# 指定したテーブルのレコード件数を数える関数です。
def count_rows(
    connection: sqlite3.Connection,
    table_name: str,
) -> int:
    row = connection.execute(f"SELECT COUNT(*) FROM {table_name}").fetchone()
    return int(row[0])


# sessionsテーブルに入った会話一覧を表示する関数です。
def fetch_session_summary(connection: sqlite3.Connection) -> list[dict[str, str]]:
    rows = connection.execute(
        """
        SELECT
            user_id,
            claude_session_id,
            title,
            updated_at
        FROM sessions
        ORDER BY updated_at DESC
        """
    ).fetchall()

    return [
        {
            "user_id": str(row[0]),
            "claude_session_id": str(row[1]),
            "title": str(row[2]),
            "updated_at": str(row[3]),
        }
        for row in rows
    ]


# 登録結果を、ターミナルで読みやすく表示する関数です。
def print_import_summary(connection: sqlite3.Connection) -> None:
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
