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


# usersテーブル、sessionsテーブル、messagesテーブルを作成する関数です。
def create_schema(connection: sqlite3.Connection) -> None:
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

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            claude_session_id TEXT NOT NULL,
            role TEXT NOT NULL
                CHECK (role IN ('user', 'assistant', 'system')),
            content TEXT NOT NULL,
            turn_number INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (claude_session_id) REFERENCES sessions (claude_session_id)
        )
        """
    )

    connection.commit()


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


# usersテーブルに、指定したuser_idが登録済みか確認する関数です。
def require_user_exists(
    connection: sqlite3.Connection,
    user_id: str,
) -> None:
    row = connection.execute(
        """
        SELECT user_id
        FROM users
        WHERE user_id = ?
          AND status = 'active'
        """,
        (user_id,),
    ).fetchone()

    if row is None:
        raise ValueError(
            f"{user_id} はusersテーブルに登録されていません。"
            "先にLesson 19を実行して、ユーザーをDBへ登録してください。"
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


# messagesテーブルに、1件の会話メッセージを追加する関数です。
def insert_message(
    connection: sqlite3.Connection,
    claude_session_id: str,
    role: str,
    content: str,
    turn_number: int,
    created_at: str,
) -> None:
    connection.execute(
        """
        INSERT INTO messages (
            claude_session_id,
            role,
            content,
            turn_number,
            created_at
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            claude_session_id,
            role,
            content,
            turn_number,
            created_at,
        ),
    )


# 指定ユーザーのセッション一覧を、新しい順に返す関数です。
def fetch_user_sessions(
    connection: sqlite3.Connection,
    user_id: str,
) -> list[dict[str, str]]:
    rows = connection.execute(
        """
        SELECT
            claude_session_id,
            title,
            cwd,
            created_at,
            updated_at,
            last_resumed_at
        FROM sessions
        WHERE user_id = ?
        ORDER BY updated_at DESC, id DESC
        """,
        (user_id,),
    ).fetchall()

    return [
        {
            "claude_session_id": str(row[0]),
            "title": str(row[1]),
            "cwd": str(row[2]),
            "created_at": str(row[3]),
            "updated_at": str(row[4]),
            "last_resumed_at": str(row[5]),
        }
        for row in rows
    ]


# 指定セッションに次に追加するturn_numberを計算する関数です。
def next_turn_number(
    connection: sqlite3.Connection,
    claude_session_id: str,
) -> int:
    row = connection.execute(
        """
        SELECT COALESCE(MAX(turn_number), 0) + 1
        FROM messages
        WHERE claude_session_id = ?
        """,
        (claude_session_id,),
    ).fetchone()
    return int(row[0])


# resumeしたセッションを最新扱いにするため、sessionsの日時を更新する関数です。
def mark_session_resumed(
    connection: sqlite3.Connection,
    claude_session_id: str,
    resumed_at: str,
) -> None:
    connection.execute(
        """
        UPDATE sessions
        SET updated_at = ?,
            last_resumed_at = ?
        WHERE claude_session_id = ?
        """,
        (
            resumed_at,
            resumed_at,
            claude_session_id,
        ),
    )


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


# 指定したテーブルのレコード件数を数える関数です。
def count_rows(
    connection: sqlite3.Connection,
    table_name: str,
) -> int:
    row = connection.execute(f"SELECT COUNT(*) FROM {table_name}").fetchone()
    return int(row[0])


# sessionsテーブルに入った会話一覧を返す関数です。
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


# 1つのセッションに紐づくメッセージ一覧を、確認用に短く返す関数です。
def fetch_message_summary(
    connection: sqlite3.Connection,
    claude_session_id: str,
) -> list[dict[str, str]]:
    rows = connection.execute(
        """
        SELECT
            role,
            turn_number,
            substr(content, 1, 80)
        FROM messages
        WHERE claude_session_id = ?
        ORDER BY turn_number
        """,
        (claude_session_id,),
    ).fetchall()

    return [
        {
            "role": str(row[0]),
            "turn_number": str(row[1]),
            "preview": str(row[2]),
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
