from graph.build_graph import RecommenderState

def planner(state: RecommenderState) -> RecommenderState:
    filled = state.get('slots', {})
    if {'budget','workplace'}.issubset(filled):
        return {**state, 'next': 'graph'}
    needed = []
    if 'budget' not in filled: needed.append('예산(월세/전세)')
    if 'workplace' not in filled: needed.append('주 활동지역')
    question = '추가로 ' + ', '.join(needed) + ' 알려주세요.'
    return {**state, 'ask': question, 'next': 'ask_user'}

def ask_user(state: RecommenderState) -> RecommenderState:
    return state