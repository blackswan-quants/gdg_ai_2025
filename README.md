# Lorax, The Agent That Teaches You The Way You Learn

<p align="center">
  <img src="https://img.shields.io/badge/python-3.9%2B-blue.svg" alt="Python version">
  <img src="https://img.shields.io/badge/status-active-brightgreen.svg" alt="Project status">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/react-frontend-orange.svg" alt="React frontend">
  <img src="https://img.shields.io/badge/frontend-Vite-blueviolet.svg" alt="Frontend build">
  <img src="https://img.shields.io/badge/AI-knowledge_graph-lightgrey.svg" alt="AI Techniques">
</p>

## Abstract

Lorax is an AI-powered educational add-on for the Braynr ecosystem, designed to enhance learning through structured organization, content personalization, and gamified engagement. It addresses students' struggles with unstructured materials and low motivation by generating dynamic knowledge graphs, tailoring content to individual learning styles, and introducing a competitive flashcard system. Seamlessly integrated with Braynr, Lorax intelligently repurposes existing tools and user content to create a customized and effective study experience.

---

## Core Requirements

- Python 3.9+ (as indicated by .python-version)
- Node.js (for the React frontend)
- npm or yarn (for frontend dependencies)

---

## Installation

1. _Clone the repository (with submodules):_
   bash
   git clone --recursive https://github.com/blackswan-quants/gdg_ai_2025.git
   cd gdg_ai_2025

   If you forgot --recursive, you can run:
   bash
   git submodule update --init --recursive

2. _Create and activate a virtual environment:_
   bash
   python -m venv .venv

   - On macOS/Linux:
     bash
     source .venv/bin/activate
   - On Windows:
     bash
     .\.venv\Scripts\activate

3. _Python Dependencies_
   Install Python dependencies using: bash pip install -r requirements.txt # or using the project's pyproject.toml
4. _Frontend Dependencies_
   For the React frontend (in react_frontend directory):
   bash
   cd react_frontend
   npm install
5. _Additional Tools_

   - FastAPI (based on app.py and fast_api_prompt_opti)
   - Vite (from vite.config.ts)
   - Tailwind CSS (from tailwind.config.js)
   - ESLint (from eslint.config.js)

6. _(Optional) Configure VS Code:_
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

- _Knowledge Graph Creation: We used \*\*BERTopic_ for topic modeling, which leverages transformer embeddings to identify themes within the study material. This technique allowed us to structure the content into a dynamic knowledge graph, showing the relationships between different chapters and topics.

- _Prerequisites Identification: We utilized \*\*Google Gemini_'s model via its API to determine the prerequisite knowledge required for each chapter. This allows the system to provide recommendations on the essential concepts to grasp before studying the current chapter.

- _Personalization Agents_:

  - _Online Recommendation System (Bandit Algorithm)_: The UCB1 bandit algorithm selects the most effective prompts for text re-elaboration based on previous interactions.
  - _AI Agent for Text Re-Elaboration_: This agent customizes the study material, making it easier to digest by simplifying language, adding examples, or adjusting the depth of explanation.
  - _Tester for Performance Evaluation_: After re-elaborating the content, the tester evaluates the user's comprehension through quizzes, feeding feedback into the recommendation system to further personalize the learning experience.

- _Gamification - Battle Mode_: In this mode, learners compete with personalized flashcard decks to reinforce knowledge through active recall and peer assessments, making learning engaging and competitive.

---

## Team & Contact

This project was developed by the _GXBrats_ team.

- _Giulia Talà_ – [LinkedIn](https://www.linkedin.com/in/giuliatala/)
- _Gloria Desideri_ – [LinkedIn](https://www.linkedin.com/in/gloria-desideri/)
- _Pietro Bottan_ – [LinkedIn](https://www.linkedin.com/in/pietro-bottan/)
- _Riccardo Baudone_ – [LinkedIn](https://www.linkedin.com/in/riccardo-baudone-296941155/)

For inquiries or collaboration opportunities, feel free to reach out via LinkedIn or GitHub.
