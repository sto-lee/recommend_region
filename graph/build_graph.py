from typing import Any, List, Dict, TypedDict

from langgraph.graph import StateGraph, END
from agents.graph_agent import graph_agent
from agents.planner_agent import planner
from agents.ask_user import ask_user
from agents.rank_agent import rank_agent
from agents.retrieve_agent import retrieve_agent
from agents.slot_filler_agent import slot_filler

typedef = TypedDict

class Slots(typedef, total=False):
    budget: str
    workplace: str
    lifestyle: str
    budget_type: str

class RecommenderState(typedef, total=False):
    question: str
    tools: Any
    history: List[Any]
    slots: Slots
    ask: str
    retrieved: List[Any]
    candidates: List[Dict]
    answer: str

def build_graph():
    sg = StateGraph(RecommenderState)
    sg.set_entry_point('fill')
    sg.add_node('fill', slot_filler)
    sg.add_node('plan', planner)
    sg.add_node('ask_user', ask_user)
    sg.add_node('graph', graph_agent)
    sg.add_node('retrieve', retrieve_agent)
    sg.add_node('rank', rank_agent)
    sg.add_edge('fill','plan')
    sg.add_conditional_edges('plan', lambda s: s['next'], {'ask_user':'ask_user','graph':'graph'})
    sg.add_edge('ask_user', END)
    sg.add_edge('graph','retrieve')
    sg.add_edge('retrieve','rank')
    sg.add_edge('rank', END)
    return sg.compile()