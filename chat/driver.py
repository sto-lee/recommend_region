from graph.build_graph import build_graph
from langgraph.checkpoint.memory import MemorySaver

_memory = MemorySaver()
_compiled = build_graph().with_config(checkpointer=_memory)

def run_chat(question: str, tools, session_id: str='default', prev_state: dict = None) -> dict:
    # 이전 state가 있으면 병합해서 전달
    state = {'question': question, 'tools': tools}
    if prev_state:
        # 이전 슬롯, 히스토리 등 유지
        for k in ['slots', 'history']:
            if k in prev_state:
                state[k] = prev_state[k]
    return _compiled.invoke(state, config={'configurable': {'thread_id': session_id}})
