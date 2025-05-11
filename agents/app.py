import streamlit as st
import numpy as np
from langchain.llms import OpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.prompts import PromptTemplate
from typing import List, Dict, Tuple
import math

class UCB1Bandit:
    def __init__(self, n_arms: int):
        self.n_arms = n_arms
        self.values = np.zeros(n_arms)  # Average reward for each arm
        self.counts = np.zeros(n_arms)  # Number of times each arm was pulled
        self.total_pulls = 0
    
    def select_arm(self) -> int:
        if self.total_pulls < self.n_arms:
            # Initial exploration phase
            return self.total_pulls
        
        # UCB1 formula: value + sqrt(2 * ln(total_pulls) / count)
        ucb_values = self.values + np.sqrt(2 * np.log(self.total_pulls) / self.counts)
        return np.argmax(ucb_values)
    
    def update(self, arm: int, reward: float):
        self.counts[arm] += 1
        self.total_pulls += 1
        # Update the average reward using incremental update formula
        self.values[arm] = self.values[arm] + (reward - self.values[arm]) / self.counts[arm]

class ContentGenerator:
    def __init__(self, openai_api_key: str):
        self.llm = OpenAI(temperature=0.7, openai_api_key=openai_api_key)
        self.prompts = [
            "Explain the concept in a simple and engaging way, focusing on practical examples.",
            "Break down the concept into its fundamental components and explain each part.",
            "Compare and contrast this concept with related ideas, highlighting key differences.",
            "Present the concept through a real-world scenario or case study."
        ]
        
        self.agent = initialize_agent(
            [self.llm],
            AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True
        )
    
    def generate_content_and_test(self, text: str, prompt: str) -> Tuple[str, str, bool]:
        # Generate content using the selected prompt
        content_prompt = f"""
        Given the following text: "{text}"
        
        {prompt}
        
        Also, create a simple true/false question to test understanding of the key concept.
        Format your response as:
        CONTENT: [your explanation]
        QUESTION: [true/false question]
        ANSWER: [true/false]
        """
        
        response = self.agent.run(content_prompt)
        
        # Parse the response
        try:
            content = response.split("QUESTION:")[0].replace("CONTENT:", "").strip()
            question_part = response.split("QUESTION:")[1].split("ANSWER:")[0].strip()
            answer = response.split("ANSWER:")[1].strip().lower()
            correct_answer = answer == "true"
            
            return content, question_part, correct_answer
        except:
            # Fallback in case of parsing error
            return response, "Is this statement true or false?", True

def main():
    st.title("Adaptive Learning Content Generator")
    
    # Initialize session state
    if 'bandit' not in st.session_state:
        st.session_state.bandit = UCB1Bandit(n_arms=4)
    if 'content_generator' not in st.session_state:
        api_key = st.secrets.get("OPENAI_API_KEY", "")
        if not api_key:
            api_key = st.text_input("Enter your OpenAI API key:", type="password")
            if not api_key:
                st.warning("Please enter your OpenAI API key to continue.")
                return
        st.session_state.content_generator = ContentGenerator(api_key)
    if 'current_content' not in st.session_state:
        st.session_state.current_content = None
    if 'current_question' not in st.session_state:
        st.session_state.current_question = None
    if 'correct_answer' not in st.session_state:
        st.session_state.correct_answer = None
    if 'show_test' not in st.session_state:
        st.session_state.show_test = False
    
    # Sidebar for statistics
    with st.sidebar:
        st.header("Prompt Performance")
        for i, (value, count) in enumerate(zip(st.session_state.bandit.values, st.session_state.bandit.counts)):
            st.write(f"Prompt {i+1}: Value={value:.2f}, Times used={int(count)}")
    
    # Main content area
    text_to_elaborate = st.text_area("Enter the text to elaborate:", height=100)
    
    if st.button("Generate Content"):
        if not text_to_elaborate:
            st.warning("Please enter some text to elaborate.")
            return
        
        # Select prompt using UCB1
        arm = st.session_state.bandit.select_arm()
        prompt = st.session_state.content_generator.prompts[arm]
        
        # Generate content and test
        content, question, correct_answer = st.session_state.content_generator.generate_content_and_test(
            text_to_elaborate, prompt
        )
        
        st.session_state.current_content = content
        st.session_state.current_question = question
        st.session_state.correct_answer = correct_answer
        st.session_state.show_test = True
        st.session_state.current_arm = arm
    
    # Display content and test
    if st.session_state.current_content:
        st.subheader("Generated Content")
        st.write(st.session_state.current_content)
        
        if st.session_state.show_test:
            st.subheader("Test Your Understanding")
            st.write(st.session_state.current_question)
            
            answer = st.radio("Is this statement true or false?", ["True", "False"])
            
            if st.button("Submit Answer"):
                is_correct = (answer == "True") == st.session_state.correct_answer
                reward = 1.0 if is_correct else 0.0
                
                # Update bandit
                st.session_state.bandit.update(st.session_state.current_arm, reward)
                
                if is_correct:
                    st.success("Correct! Well done!")
                else:
                    st.error("Incorrect. Try again!")
                
                st.session_state.show_test = False
                st.experimental_rerun()

if __name__ == "__main__":
    main() 