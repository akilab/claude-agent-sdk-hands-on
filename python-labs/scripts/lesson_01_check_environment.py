from __future__ import annotations

import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path


REQUIRED_PYTHON = (3, 10)
OFFICIAL_DOCS = [
    {
        "title": "Agent SDK の概要",
        "url": "https://code.claude.com/docs/ja/agent-sdk/overview",
    },
    {
        "title": "クイックスタート",
        "url": "https://code.claude.com/docs/ja/agent-sdk/quickstart",
    },
    {
        "title": "Claude プランで Agent SDK を使用する",
        "url": "https://support.claude.com/ja/articles/15036540-claude-%E3%83%97%E3%83%A9%E3%83%B3%E3%81%A7-claude-agent-sdk-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B",
    },
]


def print_section(title: str) -> None:
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


def run_command(command: list[str]) -> tuple[bool, str]:
    try:
        completed = subprocess.run(
            command,
            check=False,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError:
        return False, "command not found"

    output = completed.stdout.strip() or completed.stderr.strip()
    return completed.returncode == 0, output


def check_python_version() -> bool:
    print_section("Python")

    version = sys.version_info
    version_text = platform.python_version()
    print(f"Python version: {version_text}")
    print(f"Python executable: {sys.executable}")

    if version >= REQUIRED_PYTHON:
        print("OK: Python 3.10+ is available.")
        return True
    else:
        print("NG: Python 3.10+ is required for this curriculum.")
        return False


def check_uv() -> bool:
    print_section("uv")

    uv_path = shutil.which("uv")
    if uv_path is None:
        print("NG: uv is not available on PATH.")
        print("Install uv before Lesson 02.")
        return False

    ok, output = run_command(["uv", "--version"])
    print(f"uv path: {uv_path}")
    print(f"uv version: {output if ok else 'could not read version'}")
    return ok


def check_auth_environment() -> bool:
    print_section("Authentication environment")

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if api_key:
        print("WARNING: ANTHROPIC_API_KEY is set.")
        print("This may cause API key authentication to be used instead of a Claude plan.")
        print("The actual API key value is intentionally not printed.")
        return False
    else:
        print("OK: ANTHROPIC_API_KEY is not set in this shell.")
        return True


def check_project_layout() -> bool:
    print_section("Project layout")

    script_path = Path(__file__).resolve()
    labs_dir = script_path.parents[1]
    expected_dirs = [
        labs_dir / "src" / "agent_sdk_learning",
        labs_dir / "scripts",
        labs_dir / "data",
        labs_dir / "outputs",
    ]

    print(f"python-labs directory: {labs_dir}")

    all_found = True
    for directory in expected_dirs:
        if directory.exists():
            print(f"OK: {directory.name} exists - {directory}")
        else:
            print(f"NG: missing directory - {directory}")
            all_found = False

    return all_found


def show_official_docs() -> None:
    print_section("Official documentation to check")

    for index, doc in enumerate(OFFICIAL_DOCS, start=1):
        print(f"{index}. {doc['title']}")
        print(f"   {doc['url']}")


def print_summary(results: dict[str, bool]) -> None:
    print_section("Summary")

    for name, ok in results.items():
        status = "OK" if ok else "要確認"
        print(f"{name}: {status}")


def main() -> None:
    print("Claude Agent SDK Hands-on / Lesson 01")
    results = {
        "Python 3.10+": check_python_version(),
        "uv": check_uv(),
        "Authentication environment": check_auth_environment(),
        "Project layout": check_project_layout(),
    }
    show_official_docs()
    print_summary(results)


if __name__ == "__main__":
    main()


