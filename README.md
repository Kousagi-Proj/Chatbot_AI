# Chatbot_AI
College project for semi-working chatbot

-------------------------------------------------------------------------

NOTE: requires python, fastapi, uvicorn, transformers, torch to be installed

--------------------------------------------------------------------------

create a new file solely for the AI, call it whatever

create new environment using 'venv\Scripts\activate' in windows cmd

(if you dont have the necessary tools, do this, otherwise just continue:
in windows cmd, do 'pip install fastapi uvicorn transformers torch'. 
this downloads all the stuff you need directly into the ai folder without 
having to go through arduous tasks to get the tools)

create file 'chatbot-backend'

place 'main.py' in chatbot-backend

begin local server using 'uvicorn main:app --reload' in cmd

pray the bot loads in :)

its still extremely rough, be patient, it's not your computer's fault, the bots load slowly


# backend-requirements
fastapi
uvicorn
transformers
torch
sentence-transformers
faiss-cpu
websockets
python-dotenv