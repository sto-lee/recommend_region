from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

from graph.build_graph import RecommenderState
from config import OPENAI_API_KEY

llm_for_slots = ChatOpenAI(model="gpt-4o-mini", temperature=0, api_key=OPENAI_API_KEY)

# Node implementations
def slot_filler(state: RecommenderState) -> RecommenderState:
    text = state['question']
    slots = dict(state.get('slots', {}))

    sys = SystemMessage(
        """
        너는 사용자의 주거 조건을 추출하는 챗봇이야.
        아래 사용자 입력에서 예산(budget), 예산유형(budget_type: 월세/전세), 생활지역(workplace: 회사/직장/학교/노는곳/생활지역 등), 라이프스타일(lifestyle: 여가, 영화, 공연, 운동, 쇼핑, 카페, 공원, 음악, 미술, 전시 등)을 찾아서 아래 예시처럼 JSON으로 반환해.
        예시: {\"budget\": 600000, \"budget_type\": \"월세\", \"workplace\": \"홍대\", \"lifestyle\": \"여가\"}
        값이 없으면 해당 key는 생략해.
        반드시 JSON만 반환해.
        """
    )
    human = HumanMessage(content=text)
    resp = llm_for_slots.invoke([sys, human])
    try:
        import json
        slots_llm = json.loads(resp.content)
        slots.update(slots_llm)
    except Exception:
        pass  # 파싱 실패 시 기존 방식 유지
    return {**state, 'slots': slots}