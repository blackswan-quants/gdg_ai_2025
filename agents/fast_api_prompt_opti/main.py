import numpy as np
import google.generativeai as genai
from typing import List, Dict, Tuple, Optional
import os
import json
from pathlib import Path

from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
load_dotenv()
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
    
    def get_distributions(self) -> List[float]:
        if self.total_pulls == 0:
            return [1.0 / self.n_arms] * self.n_arms
        
        # Calculate softmax of UCB values for distribution
        ucb_values = self.values + np.sqrt(2 * np.log(self.total_pulls) / self.counts)
        exp_values = np.exp(ucb_values - np.max(ucb_values))  # Subtract max for numerical stability
        return (exp_values / exp_values.sum()).tolist()
    
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

# Create data directory if it doesn't exist
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)
state_file = data_dir / "bandit_state.json"
    
# Initialize or load bandit
bandit = UCB1Bandit.load_state(str(state_file), n_arms=4)
    # Get Google API key
api_key = os.getenv("GOOGLE_API_KEY")
content_generator = ContentGenerator(api_key)

app = FastAPI()

class ContentRequest(BaseModel):
    content: str

class BanditUpdate(BaseModel):
    arm: int
    reward: float

class BanditResponse(BaseModel):
    values: List[float]
    counts: List[float]
    total_pulls: int
    distributions: List[float]

@app.post("/generate_content")
def generate_content(request: ContentRequest):
    # Extract the content from the request
    content_to_elaborate = request.content
    
    # Get the arm index from bandit
    arm = bandit.select_arm()
    
    # Get the corresponding prompt for the selected arm
    prompt = content_generator.prompts[arm]
    
    # Generate content, question, and correct answer
    content, question, correct_answer = content_generator.generate_content_and_test(content_to_elaborate, prompt)
    
    # Return the response with the content, question, correct answer, and arm index
    return {
        "content": content,
        "question": question,
        "correct_answer": correct_answer,
        "arm_index": arm
    }

@app.post("/update_bandit", response_model=BanditResponse)
def update_bandit(update: BanditUpdate):
    try:
        
        # Update with new reward
        bandit.update(update.arm, update.reward)
        
        # Get current distributions
        distributions = bandit.get_distributions()
        
        return BanditResponse(
            values=bandit.values.tolist(),
            counts=bandit.counts.tolist(),
            total_pulls=bandit.total_pulls,
            distributions=distributions
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/bandit_state", response_model=BanditResponse)
def get_bandit_state():
    distributions = bandit.get_distributions()
    return BanditResponse(
        values=bandit.values.tolist(),
        counts=bandit.counts.tolist(),
        total_pulls=bandit.total_pulls,
        distributions=distributions
    )



