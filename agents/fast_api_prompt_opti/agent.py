import os
import json
import numpy as np

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