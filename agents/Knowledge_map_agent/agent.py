# knowledge_map_agent/agent.py
from google.adk.agent import Agent
from google.adk.tool import tool
from knowledge_map_agent.schema import Topic
from knowledge_map_agent.tools import extract_topics_from_chapters, build_knowledge_graph_and_save_json
import pandas as pd

@tool(name="generate_knowledge_map_from_dataframe", description="Extract topics from a dataframe of chapters and build a knowledge graph saved as JSON.")
def generate_knowledge_map_from_dataframe(df: pd.DataFrame, output_path: str = None) -> dict:
    # Step 1: Extract Topic objects from chapter texts
    topic_objects = extract_topics_from_chapters(df)

    # Step 2: Build and save the knowledge graph using the topic objects
    result = build_knowledge_graph_and_save_json(topic_objects, output_path)

    return result

class KnowledgeMapAgent(Agent):
    def __init__(self):
        super().__init__(
            name="KnowledgeMapAgent",
            role="Extracts key topics from chapters and builds a knowledge dependency graph.",
            tools=[generate_knowledge_map_from_dataframe],
            prompt_template="You are a knowledge indexing assistant that takes chapters and extracts key topics, then builds a dependency graph from them."
        )
