from graph.build_graph import RecommenderState

def graph_agent(state: RecommenderState) -> RecommenderState:
    slots = state.get('slots', {})
    nodes = state['tools'].graph.neighborhoods(slots)
    return {**state, 'candidates': nodes}