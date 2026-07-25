from claude_agent_sdk import ClaudeAgentOptions, ClaudeSDKClient

from shared.display import print_section


SECTION_LESSONS = [
    "ClaudeSDKClientの最小構成",
    "同じclientでフォローアップする",
    "session_idを保存する",
    "resumeで特定の会話を再開する",
    "複数ユーザー相当の会話を分ける",
    "ストリーミング表示の基礎",
    "中断とエラー時の扱い",
    "ミニチャットCLIを作る",
]


# ClaudeSDKClient編で学ぶ項目を表示する関数です。
def print_section_lessons() -> None:
    print_section("ClaudeSDKClient section")
    for index, lesson in enumerate(SECTION_LESSONS, start=1):
        print(f"{index}. {lesson}")


# SDKからClaudeSDKClientとClaudeAgentOptionsを読み込めるか確認する関数です。
def print_sdk_parts() -> None:
    print_section("SDK parts")
    print(f"ClaudeSDKClient: {ClaudeSDKClient.__name__}")
    print(f"ClaudeAgentOptions: {ClaudeAgentOptions.__name__}")


# このレッスンの確認処理をまとめる関数です。
def main() -> None:
    print_sdk_parts()
    print_section_lessons()


if __name__ == "__main__":
    main()
