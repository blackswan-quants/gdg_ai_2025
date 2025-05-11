# LORAX
# react frontend

# Agents
Contains a knowledge map agent and a rielaboration agent
The knowledge map agent is a streamlit app that given a set of documents connects them based on common topics.
The prompt optimization agent is an algorithm that iteratively choses a different prompt to elaborate a text, the prompt is used to generate a new version of the text and an evaluation question. According to the performance on the question the agent is then updated until it learns the optimal prompt.