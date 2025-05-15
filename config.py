import os
from dotenv import load_dotenv
from tools.graph_query import GraphQueryTool
from config import NEO4J_URL, NEO4J_USER, NEO4J_PW
from neo4j import GraphDatabase

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
NEO4J_URL = os.getenv('NEO4J_URL')
NEO4J_USER = os.getenv('NEO4J_USER')
NEO4J_PW = os.getenv('NEO4J_PW')

def get_tools():
    driver = GraphDatabase.driver(NEO4J_URL, auth=(NEO4J_USER, NEO4J_PW))
    return type('T', (), {'graph': GraphQueryTool(driver)})()
