from datetime import datetime, timezone
from typing import Any

from shared.display import print_section
from shared.files import write_json_file, write_text_lines
from shared.paths import OUTPUT_DIR


DESIGN_JSON_PATH = OUTPUT_DIR / "lesson_17_sqlite_design.json"
DESIGN_MARKDOWN_PATH = OUTPUT_DIR / "lesson_17_sqlite_design.md"


# UTCの現在時刻を、JSONやMarkdownに保存しやすい文字列にする関数です。
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# usersテーブルに入れる列の設計を返す関数です。
def build_users_table() -> dict[str, Any]:
    return {
        "name": "users",
        "purpose": "アプリ側の利用者を管理する",
        "columns": [
            {"name": "id", "type": "INTEGER", "role": "アプリ側の主キー"},
            {"name": "user_id", "type": "TEXT", "role": "画面やログで使うユーザー識別子"},
            {"name": "status", "type": "TEXT", "role": "active / disabled / deleted の現在状態"},
        ],
    }


# sessionsテーブルに入れる列の設計を返す関数です。
def build_sessions_table() -> dict[str, Any]:
    return {
        "name": "sessions",
        "purpose": "ユーザーごとのClaudeセッション一覧を管理する",
        "columns": [
            {"name": "id", "type": "INTEGER", "role": "アプリ側の主キー"},
            {"name": "user_id", "type": "TEXT", "role": "users.user_idと対応する値"},
            {"name": "claude_session_id", "type": "TEXT", "role": "Claude Agent SDKのsession_id"},
            {"name": "title", "type": "TEXT", "role": "会話一覧に表示するタイトル"},
            {"name": "cwd", "type": "TEXT", "role": "resume時に合わせる作業ディレクトリ"},
            {"name": "created_at", "type": "TEXT", "role": "初回作成日時"},
            {"name": "updated_at", "type": "TEXT", "role": "最後に更新した日時"},
            {"name": "last_resumed_at", "type": "TEXT", "role": "最後にresumeした日時"},
        ],
    }


# messagesテーブルに入れる列の設計を返す関数です。
def build_messages_table() -> dict[str, Any]:
    return {
        "name": "messages",
        "purpose": "各セッションに紐づく会話本文や実行ログを保存する",
        "columns": [
            {"name": "id", "type": "INTEGER", "role": "メッセージ行の主キー"},
            {"name": "claude_session_id", "type": "TEXT", "role": "sessions.claude_session_idと対応する値"},
            {"name": "role", "type": "TEXT", "role": "user / assistant / result などの種別"},
            {"name": "content", "type": "TEXT", "role": "表示・復元したい本文"},
            {"name": "turn_number", "type": "INTEGER", "role": "会話内の順序"},
            {"name": "created_at", "type": "TEXT", "role": "保存日時"},
        ],
    }


# Lesson 15/16のJSONファイル構造を、SQLiteのテーブルへ対応づける関数です。
def build_json_to_sqlite_mapping() -> list[dict[str, str]]:
    return [
        {
            "json_location": "users[].user_id",
            "sqlite_location": "users.user_id",
            "meaning": "アプリ側のユーザー識別子",
        },
        {
            "json_location": "users[].sessions[].session_id",
            "sqlite_location": "sessions.claude_session_id",
            "meaning": "Claude Agent SDKのresumeに渡すID",
        },
        {
            "json_location": "users[].sessions[].title",
            "sqlite_location": "sessions.title",
            "meaning": "会話一覧に表示する名前",
        },
        {
            "json_location": "users[].sessions[].cwd",
            "sqlite_location": "sessions.cwd",
            "meaning": "同じ作業ディレクトリでresumeするための情報",
        },
        {
            "json_location": "users[].sessions[].transcript_path",
            "sqlite_location": "messages.content",
            "meaning": "今はファイルにある本文を、将来はDBへ保存する",
        },
    ]


# SQLite化するときに守りたい設計判断を返す関数です。
def build_design_decisions() -> list[str]:
    return [
        "Claude側のsession_idと、アプリ側のユーザーIDは別物として扱う。",
        "1人のユーザーは複数のClaudeセッションを持てる。",
        "会話一覧に必要な情報はsessionsに置く。",
        "本文や実行ログのように増え続ける情報はmessagesに置く。",
        "users.statusには現在状態を置き、active / disabled / deleted のような値で管理する。",
        "無効化や再有効化の履歴まで必要なら、将来はuser_eventsのような履歴テーブルを追加する。",
        "ローカル学習ではSQLiteを使い、Web化するときも同じ設計を流用できるようにする。",
    ]


# ユーザーの無効化や削除をどう扱うか、今回の設計方針を返す関数です。
def build_lifecycle_policy() -> list[dict[str, str]]:
    return [
        {
            "case": "通常利用中",
            "current_state": "users.status = 'active'",
            "history": "履歴テーブルを使う場合は、createdなどのイベントを残す",
        },
        {
            "case": "一時的に無効化",
            "current_state": "users.status = 'disabled'",
            "history": "履歴テーブルを使う場合は、disabledイベントを残す",
        },
        {
            "case": "無効化したユーザーを再有効化",
            "current_state": "users.status = 'active' に戻す",
            "history": "履歴テーブルを使う場合は、enabledイベントを残す",
        },
        {
            "case": "削除扱いにする",
            "current_state": "users.status = 'deleted'",
            "history": "履歴テーブルを使う場合は、deletedイベントを残す",
        },
    ]


# 画面表示とファイル保存に使う設計データ全体を作る関数です。
def build_design_document() -> dict[str, Any]:
    return {
        "version": 1,
        "created_at": now_iso(),
        "goal": "JSON台帳とtranscriptファイルを、SQLiteのテーブル設計へ置き換える準備をする",
        "tables": [
            build_users_table(),
            build_sessions_table(),
            build_messages_table(),
        ],
        "relationships": [
            "users.user_id -> sessions.user_id",
            "sessions.claude_session_id -> messages.claude_session_id",
        ],
        "json_to_sqlite_mapping": build_json_to_sqlite_mapping(),
        "design_decisions": build_design_decisions(),
        "lifecycle_policy": build_lifecycle_policy(),
    }


# 1テーブル分の設計をMarkdownの行に変換する関数です。
def append_table_markdown(lines: list[str], table: dict[str, Any]) -> None:
    lines.append(f"## {table['name']}")
    lines.append("")
    lines.append(str(table["purpose"]))
    lines.append("")
    lines.append("| column | type | role |")
    lines.append("|---|---|---|")

    for column in table["columns"]:
        lines.append(f"| {column['name']} | {column['type']} | {column['role']} |")

    lines.append("")


# 設計データを、読みやすいMarkdownの行リストへ変換する関数です。
def build_markdown_lines(design: dict[str, Any]) -> list[str]:
    lines = [
        "# Lesson 17 SQLite design",
        "",
        str(design["goal"]),
        "",
        "## Tables",
        "",
    ]

    for table in design["tables"]:
        append_table_markdown(lines, table)

    lines.append("## Relationships")
    lines.append("")
    for relationship in design["relationships"]:
        lines.append(f"- {relationship}")

    lines.append("")
    lines.append("## JSON to SQLite mapping")
    lines.append("")
    lines.append("| JSON | SQLite | meaning |")
    lines.append("|---|---|---|")
    for mapping in design["json_to_sqlite_mapping"]:
        lines.append(
            f"| {mapping['json_location']} | {mapping['sqlite_location']} | {mapping['meaning']} |"
        )

    lines.append("")
    lines.append("## User lifecycle policy")
    lines.append("")
    lines.append("| case | current state | history |")
    lines.append("|---|---|---|")
    for policy in design["lifecycle_policy"]:
        lines.append(
            f"| {policy['case']} | {policy['current_state']} | {policy['history']} |"
        )

    lines.append("")
    lines.append("## Design decisions")
    lines.append("")
    for decision in design["design_decisions"]:
        lines.append(f"- {decision}")

    return lines


# ターミナルで設計の要点を確認できるように表示する関数です。
def print_design_summary(design: dict[str, Any]) -> None:
    print_section("SQLite design")
    print(design["goal"])

    print_section("Tables")
    for table in design["tables"]:
        print(f"- {table['name']}: {table['purpose']}")

    print_section("Relationships")
    for relationship in design["relationships"]:
        print(f"- {relationship}")


# 設計データをJSONとMarkdownの2形式で保存する関数です。
def save_design_files(design: dict[str, Any]) -> None:
    write_json_file(DESIGN_JSON_PATH, design)
    write_text_lines(DESIGN_MARKDOWN_PATH, build_markdown_lines(design))


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    design = build_design_document()
    print_design_summary(design)
    save_design_files(design)

    print_section("Saved files")
    print(DESIGN_JSON_PATH)
    print(DESIGN_MARKDOWN_PATH)


if __name__ == "__main__":
    main()
