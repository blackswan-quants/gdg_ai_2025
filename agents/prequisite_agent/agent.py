from google.adk.agents import LlmAgent
from google.adk.tools import google_search

# --- Constants ---
GEMINI_MODEL = "gemini-2.0-flash"

# Create the recommender agent
prerequisites_agent = LlmAgent(
    name="PrerequisitesAgent",
    model=GEMINI_MODEL,
    instruction="""You are a prerequisite recommender agent
    
    Based on your knowledge and the description of the topic you must suggest three topics that the user must know before they can understand the topic.
    
    Topic:
    {topic}

    Description:
    {description}

    These are the tools you can use to find the prerequisites:
    - google_search
    """,
    description="Recommends prerequisites for a topic",
    output_key="prerequisites",
    tools=[google_search]
)

def get_prerequisites(topic, description):
    # Use the agent to get prerequisites based on the topic and description
    response = prerequisites_agent.call(
        inputs={
            "topic": topic,
            "description": description
        }
    )
    
    # Print the response (prerequisites)
    print(f"Prerequisites for '{topic}':")
    print(response["prerequisites"])

# Sample topic and description
topic = "Human Anatomy"
description = "The study of the structure and function of the human body, including the skeletal, muscular, and nervous systems."

# Get and print the prerequisites
get_prerequisites(topic, description)