# Chatbot_AI

# How to run:
Run backend and frontend in separate terminals at same time in order to run successfully

# How to navigate to backend and run:
-Install backend requirements before
Type 'cd chatbot-backend' in the terminal and then run 'uvicorn main:app --reload' in terminal to run backend (main.py)

# How to navigate to frontend and run:
-Install frontend requirements before
Type 'cd frontend' in the terminal and then run 'npm run dev' in terminal to run frontend

# Frontend-requirements
'npm install' before running the frontend

# Backend-requirements
Create new environment using 'python -m venv 'venv\Scripts\activate'' in windows cmd

pip install:
fastapi
uvicorn
transformers
torch
sentence-transformers
faiss-cpu
websockets
python-dotenv