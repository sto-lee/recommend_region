from graph.build_graph import RecommenderState
from langchain_community.retrievers import TavilySearchAPIRetriever


def retrieve_agent(state: RecommenderState) -> RecommenderState:
    question = state['question']
    candidates = state.get('candidates', [])
    retriever = TavilySearchAPIRetriever(k=3)
    area_infos = []
    for cand in candidates:
        area = cand.get('area')
        query = f"{area} {question}" if area else question
        docs = retriever.invoke(query)
        area_infos.append({
            'area': area,
            'docs': [doc.page_content if hasattr(doc, 'page_content') else str(doc) for doc in docs]
        })
    return {**state, 'retrieved': area_infos}