import numpy as np
import google.generativeai as genai
from typing import List, Dict, Tuple
import os
import json
from pathlib import Path

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
    
    def save_state(self, filepath: str):
        state = {
            'values': self.values.tolist(),
            'counts': self.counts.tolist(),
            'total_pulls': self.total_pulls
        }
        with open(filepath, 'w') as f:
            json.dump(state, f)
    
    @classmethod
    def load_state(cls, filepath: str, n_arms: int):
        bandit = cls(n_arms)
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                state = json.load(f)
                bandit.values = np.array(state['values'])
                bandit.counts = np.array(state['counts'])
                bandit.total_pulls = state['total_pulls']
        return bandit

class ContentGenerator:
    def __init__(self, google_api_key: str):
        genai.configure(api_key=google_api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash-002')
        self.prompts = [
            "Explain the concept in a simple and engaging way, focusing on practical examples.",
            "Generate a picture with tzik and latex",
            "Break down the concept into its fundamental components and explain each part.",
            
            "Present the concept through a real-world scenario or case study."
        ]
    
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
        
        try:
            response = self.model.generate_content(content_prompt)
            response_text = response.text
            
            # Parse the response
            try:
                content = response_text.split("QUESTION:")[0].replace("CONTENT:", "").strip()
                question_part = response_text.split("QUESTION:")[1].split("ANSWER:")[0].strip()
                answer = response_text.split("ANSWER:")[1].strip().lower()
                correct_answer = answer == "true"
                
                return content, question_part, correct_answer
            except:
                # Fallback in case of parsing error
                return response_text, "Is this statement true or false?", True
        except Exception as e:
            print(f"Error generating content: {str(e)}")
            return "Error generating content. Please try again.", "Is this statement true or false?", True

def main():
    # Create data directory if it doesn't exist
    data_dir = Path("data")
    data_dir.mkdir(exist_ok=True)
    state_file = data_dir / "bandit_state.json"
    
    # Initialize or load bandit
    bandit = UCB1Bandit.load_state(str(state_file), n_arms=4)
    
    # Get Google API key
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        api_key = input("Enter your Google API key: ").strip()
        if not api_key:
            print("Error: Google API key is required")
            return
    
    # Initialize content generator
    content_generator = ContentGenerator(api_key)
    
    print("\n=== Adaptive Learning Content Generator ===\n")
    
    while True:
        # Get text to elaborate
        print("\nEnter the text to elaborate (or 'quit' to exit):")
        text_to_elaborate = input("> ").strip()
        
        if text_to_elaborate.lower() == 'quit':
            # Save bandit state before exiting
            bandit.save_state(str(state_file))
            print("\nSaving progress and exiting...")
            break
        
        if not text_to_elaborate:
            print("Please enter some text to elaborate.")
            continue
        
        # Select prompt using UCB1
        arm = bandit.select_arm()
        prompt = content_generator.prompts[arm]
        
        print("\nGenerating content...")
        
        # Generate content and test
        content, question, correct_answer = content_generator.generate_content_and_test(
            text_to_elaborate, prompt
        )
        
        # Display content
        print("\n=== Generated Content ===")
        print(content)
        
        # Display test
        print("\n=== Test Your Understanding ===")
        print(question)
        
        # Get user's answer
        while True:
            answer = input("\nIs this statement true or false? (t/f): ").strip().lower()
            if answer in ['t', 'f']:
                break
            print("Please enter 't' for true or 'f' for false.")
        
        # Check answer and update bandit
        is_correct = (answer == 't') == correct_answer
        reward = 1.0 if is_correct else 0.0
        bandit.update(arm, reward)
        
        # Show result
        if is_correct:
            print("\nCorrect! Well done!")
        else:
            print("\nIncorrect. Try again!")
        
        # Show current statistics
        print("\n=== Current Statistics ===")
        for i, (value, count) in enumerate(zip(bandit.values, bandit.counts)):
            print(f"Prompt {i+1}: Value={value:.2f}, Times used={int(count)}")
        
        # Save state after each interaction
        bandit.save_state(str(state_file))

if __name__ == "__main__":
    main() 