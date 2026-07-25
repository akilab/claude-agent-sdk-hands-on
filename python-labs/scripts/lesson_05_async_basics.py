import asyncio
from datetime import datetime

LESSON_STEPS = [
    "入力を確認する",
    "必要なファイルを読む",
    "Agentに渡す文脈を組み立てる",
    "結果を保存する",
]


def now_text() -> str:
    return datetime.now().strftime("%H:%M:%S")


def print_section(title: str) -> None:
    print()
    print("=" * 72)
    print(title)
    print("=" * 72)


async def wait_for_step(step_name: str, seconds: float) -> str:
    print(f"[{now_text()}] start: {step_name}")
    await asyncio.sleep(seconds)
    print(f"[{now_text()}] done : {step_name}")
    return f"{step_name} が完了しました"


async def stream_agent_like_messages(topic: str):
    messages = [
        f"{topic} の目的を確認しています",
        "関連する入力を読み取っています",
        "回答の下書きを組み立てています",
        "最終結果を返します",
    ]
    
    for message in messages:
        await asyncio.sleep(0.3)
        yield message


async def run_steps_in_order() -> None:
    print_section("await: 順番に待つ")
    
    for step_name in LESSON_STEPS:
        result = await wait_for_step(step_name, 0.2)
        print(f"result: {result}")


async def run_stream() -> None:
    print_section("async for: 少しずつ届く結果を読む")
    
    async for message in stream_agent_like_messages("Lesson 05"):
        print(f"message: {message}")


async def run_steps_in_parallel() -> None:
    print_section("asyncio.gather: 複数の確認を並行して待つ")
    
    tasks = [
        wait_for_step("Python環境を確認する", 0.5),
        wait_for_step("学習ログを確認する", 0.3),
        wait_for_step("次のレッスンを確認する", 0.4),
    ]
    
    results = await asyncio.gather(*tasks)
    
    print()
    print("Parallel results:")
    for result in results:
        print(f"- {result}")


async def main_async() -> None:
    print("Claude Agent SDK Hands-on / Lesson 05")
    await run_steps_in_order()
    await run_stream()
    await run_steps_in_parallel()


def main() -> None:
    asyncio.run(main_async())


if __name__ == "__main__":
    main()


