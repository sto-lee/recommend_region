from graph.build_graph import RecommenderState
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
from config import OPENAI_API_KEY

llm_for_recommendation = ChatOpenAI(model="gpt-4o-mini", temperature=0, api_key=OPENAI_API_KEY)

def rank_agent(state: RecommenderState) -> RecommenderState:
    sys = SystemMessage(
        """당신은 20-30대 청년을 위한 서울 지역 추천 전문가입니다.
        그래프DB에 존재하는 지역 중 사용자의 조건에 맞는 지역을 추천해줘야 합니다.
        추천에 대한 이유를 함께 제시해주세요.
        이유에는 주거비용, 주변 문화시설, 교통편 등 사용자가 원하는 정보를 포함해야 합니다.
        반드시 한국어로 답변하세요."""
    )
    # candidates: 후보지 정보, retrieved: 후보지별 문화시설 정보
    human = HumanMessage(content=str({
        'slots': state['slots'],
        'candidates': state['candidates'],
        'area_infos': state['retrieved']
    }))
    resp = llm_for_recommendation.invoke([sys, human])
    return {**state, 'answer': resp.content}