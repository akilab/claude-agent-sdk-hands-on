from shared.database import (
    connect_database,
    create_schema,
    print_database_summary,
)


# このファイルを直接実行したときの入口になる関数です。
def main() -> None:
    with connect_database() as connection:
        create_schema(connection)
        print_database_summary(connection)


if __name__ == "__main__":
    main()
