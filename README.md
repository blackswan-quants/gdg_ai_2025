## Abstract

Lorax is an AI-powered educational add-on for the Braynr ecosystem, designed to enhance learning through structured organization, content personalization, and gamified engagement. It addresses students' struggles with unstructured materials and low motivation by generating dynamic knowledge graphs, tailoring content to individual learning styles, and introducing a competitive flashcard system. Seamlessly integrated with Braynr, Lorax intelligently repurposes existing tools and user content to create a customized and effective study experience.

---

## Core Requirements
- Python 3.9+ (as indicated by .python-version)
- Node.js (for the React frontend)
- npm or yarn (for frontend dependencies)

---

## Installation

1. *Clone the repository (with submodules):*
   bash
   git clone --recursive https://github.com/blackswan-quants/gdg_ai_2025.git
   cd gdg_ai_2025
   

   If you forgot --recursive, you can run:
   bash
   git submodule update --init --recursive
   

2. *Create and activate a virtual environment:*
   bash
   python -m venv .venv
   

   - On macOS/Linux:
     bash
     source .venv/bin/activate
     
   - On Windows:
     bash
     .\.venv\Scripts\activate
     

3. *Python Dependencies*
   Install Python dependencies using: bash pip install -r requirements.txt  # or using the project's pyproject.toml
     
4. *Frontend Dependencies*
    For the React frontend (in react_frontend directory):
    bash
    cd react_frontend
    npm install
    
6. *Additional Tools*
    - FastAPI (based on app.py and fast_api_prompt_opti)
    - Vite (from vite.config.ts)
    - Tailwind CSS (from tailwind.config.js)
    - ESLint (from eslint.config.js)

7. *(Optional) Configure VS Code:*
    Open the project folder in VS Code and select the .venv environment (Cmd/Ctrl+Shift+P → Python: Select Interpreter).

## Usage

### Backend (FastAPI)
1. Start the backend server:
   bash
   python app.py
   
   or (if using Uvicorn):
   bash
   uvicorn app:app --reload
   

### Frontend (React/Vite)
1. Navigate to the frontend directory:
   bash
   cd react_frontend
   
   
2. Install dependencies (if not already installed):
   bash
   npm install
   
   
3. Start the development server:
   bash
   npm run dev
   

### Agents
To run specific agents (like the Knowledge Map Agent or Prerequisite Agent):
bash
python agents/Knowledge_map_agent.py 
python agents/prequisite_agent.py


### Accessing the Application
- Frontend will typically be available at: http://localhost:5173
- Backend API (if running separately) at: http://localhost:8000
  
---

## Methodology Summary

The Lorax application leverages several advanced techniques to enhance the learning experience. We utilized various AI-powered methods to personalize, organize, and gamify the learning process. Here's a summary of the core components used:

- *Knowledge Graph Creation: We used **BERTopic* for topic modeling, which leverages transformer embeddings to identify themes within the study material. This technique allowed us to structure the content into a dynamic knowledge graph, showing the relationships between different chapters and topics.

- *Prerequisites Identification: We utilized **Google Gemini*'s model via its API to determine the prerequisite knowledge required for each chapter. This allows the system to provide recommendations on the essential concepts to grasp before studying the current chapter.

- *Personalization Agents*:
  - *Online Recommendation System (Bandit Algorithm)*: The UCB1 bandit algorithm selects the most effective prompts for text re-elaboration based on previous interactions.
  - *AI Agent for Text Re-Elaboration*: This agent customizes the study material, making it easier to digest by simplifying language, adding examples, or adjusting the depth of explanation.
  - *Tester for Performance Evaluation*: After re-elaborating the content, the tester evaluates the user's comprehension through quizzes, feeding feedback into the recommendation system to further personalize the learning experience.

- *Gamification - Battle Mode*: In this mode, learners compete with personalized flashcard decks to reinforce knowledge through active recall and peer assessments, making learning engaging and competitive.

---

## Team & Contact

This project was developed by the *GXBrats* team.

- *Giulia Talà* – [LinkedIn](https://www.linkedin.com/in/giuliatala/)  
- *Gloria Desideri* – [LinkedIn](https://www.linkedin.com/in/gloria-desideri/)  
- *Pietro Bottan* – [LinkedIn](https://www.linkedin.com/in/pietro-bottan/)
- *Riccardo Baudone* – [LinkedIn](https://www.linkedin.com/in/riccardo-baudone-296941155/)

For inquiries or collaboration opportunities, feel free to reach out via LinkedIn or GitHub.