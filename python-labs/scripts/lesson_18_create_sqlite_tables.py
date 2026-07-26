import sqlite3
from typing import Any

from shared.display import print_section
from shared.paths import DATA_DIR


DATABASE_PATH = DATA_DIR / "agent_sessions.sqlite3"


# 後続レッスンでも使うSQLiteファイルへ接続する関数です。
def connect_database() -> sqlite3.Connection:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


# アプリ側のユーザーを保存するusersテーブルを作る関数です。
def create_users_table(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL UNIQUE,
            status TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'disabled', 'deleted'))
        )
        """
    )


# Claude Agent SDKのsession_idを、ユーザーごとの会話一覧として保存するsessionsテーブルを作る関数です。
def create_sessions_table(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            claude_session_id TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            cwd TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            last_resumed_at TEXT NOT NULL DEFAULT '',
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        )
        """
    )


# 各セッションに紐づく会話本文や結果ログを保存するmessagesテーブルを作る関数です。
def create_messages_table(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            claude_session_id TEXT NOT NULL,
            role TEXT NOT NULL
                CHECK (role IN ('user', 'assistant', 'result', 'system')),
            content TEXT NOT NULL,
            turn_number INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (claude_session_id) REFERENCES sessions (claude_session_id)
        )
        """
    )


# 3つのCREATE TABLEをまとめて実行し、最後に保存を確定する関数です。
def create_schema(connection: sqlite3.Connection) -> None:
    create_users_table(connection)
    create_sessions_table(connection)
    create_messages_table(connection)
    connection.commit()


# SQLite内に作成済みのテーブル名を確認する関数です。
def list_tables(connection: sqlite3.Connection) -> list[str]:
    rows = connection.execute(
        """
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
          AND name NOT LIKE 'sqlite_%'
        ORDER BY name
        """
    ).fetchall()
    return [row[0] for row in rows]


# 1つのテーブルについて、列名、型、NOT NULL、主キーなどの情報を確認する関数です。
def describe_table(
    connection: sqlite3.Connection,
    table_name: str,
) -> list[dict[str, Any]]:
    rows = connection.execute(f"PRAGMA table_info({table_name})").fetchall()
    return [
        {
            "name": row[1],
            "type": row[2],
            "not_null": bool(row[3]),
            "default": row[4],
            "primary_key": bool(row[5]),
        }
        for row in rows
    ]


# 作成したテーブルと列を、ターミナルで読みやすく表示する関数です。
def print_database_summary(connection: sqlite3.Connection) -> None:
    print_section("Database")
    print(DATABASE_PATH)

    table_names = list_tables(connection)
    print_section("Tables")
    for table_name in table_names:
        print(f"- {table_name}")

    print_section("Columns")
    for table_name in table_names:
        print(f"[{table_name}]")
        for column in describe_table(connection, table_name):
            required = "required" if column["not_null"] else "optional"
            primary = " primary_key" if column["primary_key"] else ""
            default = f" default={column['default']}" if column["default"] is not None else ""
            print(f"- {column['name']} {column['type']} {required}{primary}{default}")


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    with connect_database() as connection:
        create_schema(connection)
        print_database_summary(connection)


if __name__ == "__main__":
    main()
