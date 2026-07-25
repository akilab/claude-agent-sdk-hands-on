from __future__ import annotations

from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PYPROJECT_PATH = PROJECT_ROOT / "pyproject.toml"
LOCK_PATH = PROJECT_ROOT / "uv.lock"
VENV_PATH = PROJECT_ROOT / ".venv"


def print_section(title: str) -> None:
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


def read_text_lines(path: Path) -> list[str]:
    if not path.exists():
        return []

    text = path.read_text(encoding="utf-8")
    return text.splitlines()


def find_line(lines: list[str], starts_with: str) -> str | None:
    for line in lines:
        stripped = line.strip()
        if stripped.startswith(starts_with):
            return stripped

    return None


def contains_text(lines: list[str], keyword: str) -> bool:
    for line in lines:
        if keyword in line:
            return True

    return False


def check_pyproject() -> bool:
    print_section("pyproject.toml")

    if not PYPROJECT_PATH.exists():
        print(f"NG: {PYPROJECT_PATH} was not found.")
        print("Run: uv init --bare --name agent-sdk-learning")
        return False

    lines = read_text_lines(PYPROJECT_PATH)
    name_line = find_line(lines, "name =")
    python_line = find_line(lines, "requires-python =")
    has_dependency = contains_text(lines, "claude-agent-sdk")

    print(f"OK: found {PYPROJECT_PATH}")
    print(f"Project name: {name_line or 'not found'}")
    print(f"Python requirement: {python_line or 'not found'}")

    if has_dependency:
        print("OK: claude-agent-sdk is listed in dependencies.")
    else:
        print("INFO: claude-agent-sdk is not listed yet.")
        print("Run it when you are ready: uv add claude-agent-sdk")

    return name_line is not None and python_line is not None


def check_lockfile() -> bool:
    print_section("uv.lock")

    if LOCK_PATH.exists():
        print(f"OK: found {LOCK_PATH}")
        print("This file records exact dependency versions.")
        return True

    print("INFO: uv.lock was not found yet.")
    print("Run: uv run python --version")
    return False


def check_virtual_environment() -> bool:
    print_section(".venv")

    if VENV_PATH.exists():
        print(f"OK: found {VENV_PATH}")
        print(".venv is local to your machine and should not be committed.")
        return True

    print("INFO: .venv was not found yet.")
    print("uv can create it when you run a project command.")
    return False


def check_learning_folders() -> bool:
    print_section("Learning folders")

    expected_dirs = [
        PROJECT_ROOT / "scripts",
        PROJECT_ROOT / "src" / "agent_sdk_learning",
        PROJECT_ROOT / "data",
        PROJECT_ROOT / "outputs",
    ]

    all_found = True
    for directory in expected_dirs:
        if directory.exists():
            print(f"OK: {directory.relative_to(PROJECT_ROOT)}")
        else:
            print(f"NG: missing {directory.relative_to(PROJECT_ROOT)}")
            all_found = False

    return all_found


def print_summary(results: dict[str, bool]) -> None:
    print_section("Summary")

    for label, ok in results.items():
        status = "OK" if ok else "要確認"
        print(f"{label}: {status}")


def main() -> None:
    print("Claude Agent SDK Hands-on / Lesson 02")
    print(f"Project root: {PROJECT_ROOT}")

    results = {
        "pyproject.toml": check_pyproject(),
        "uv.lock": check_lockfile(),
        ".venv": check_virtual_environment(),
        "learning folders": check_learning_folders(),
    }

    print_summary(results)


if __name__ == "__main__":
    main()


