from datetime import datetime, timezone

from claude_agent_sdk import ResultMessage


# 実行ログとして残したいメタ情報を辞書にまとめる関数です。
def build_run_log(
    result_message: ResultMessage,
    structured_output: dict[str, object] | None,
) -> dict[str, object]:
    return {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "subtype": result_message.subtype,
        "is_error": result_message.is_error,
        "num_turns": result_message.num_turns,
        "duration_ms": result_message.duration_ms,
        "session_id": result_message.session_id,
        "total_cost_usd": result_message.total_cost_usd,
        "has_structured_output": structured_output is not None,
    }

