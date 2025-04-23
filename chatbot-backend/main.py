from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
import logging
from datetime import datetime
from context_utils import inject_context, retrieve_faq_context, update_context, update_faq, load_context, load_faq
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_context()
load_faq()

model_name = "facebook/blenderbot-3B"
tokenizer = BlenderbotTokenizer.from_pretrained(model_name)
model = BlenderbotForConditionalGeneration.from_pretrained(model_name)

logging.basicConfig(filename="chat_logs.txt", level=logging.INFO)

class ChatRequest(BaseModel):
    message: str

class ContextUpdate(BaseModel):
    context: str

class FAQUpdate(BaseModel):
    question: str
    answer: str

STRICT_MODE = True

def is_out_of_scope_business_context(message: str) -> bool:
    business_keywords = ["return", "shipping", "order", "product", "track", "cancel", "buy"]
    return not any(word in message.lower() for word in business_keywords)

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    user_msg = request.message
    faq_response = retrieve_faq_context(user_msg)

    if STRICT_MODE:
        if faq_response:
            response = faq_response
        elif is_out_of_scope_business_context(user_msg):
            response = "I'm ProdAI, your customer service assistant. I can only help with returns, shipping, or product-related questions listed in the FAQ."
        else:
            response = "I'm ProdAI, your customer service assistant. Please ask about returns, shipping, or product-related questions."
    else:
        if faq_response:
            response = faq_response
        elif is_out_of_scope_business_context(user_msg):
            response = "I can assist you with general questions about returns, shipping, and products. How can I help you?"
        else:
            contextual_input = inject_context(user_msg)
            inputs = tokenizer([contextual_input], return_tensors="pt")
            reply_ids = model.generate(**inputs, max_length=100)
            response = tokenizer.batch_decode(reply_ids, skip_special_tokens=True)[0]
            response = clean_response(response)

    log_interaction(user_msg, response)
    return {"response": response}


@app.post("/update-context")
async def update_business_context(update: ContextUpdate):
    update_context(update.context)
    return {"message": "Context updated."}

@app.post("/update-faq")
async def update_faq_entry(faq: FAQUpdate):
    update_faq(faq.question, faq.answer)
    return {"message": "FAQ updated."}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            faq_response = retrieve_faq_context(data)

            if STRICT_MODE:
                if faq_response:
                    response = faq_response
                elif is_out_of_scope_business_context(data):
                    response = "I'm ProdAI, your customer service assistant. I can only help with returns, shipping, or product-related questions listed in the FAQ."
                else:
                    response = "I'm ProdAI, your customer service assistant. Please ask about returns, shipping, or product-related questions."
            else:
                if faq_response:
                    response = faq_response
                elif is_out_of_scope_business_context(data):
                    response = "I can assist you with general questions about returns, shipping, and products. How can I help you?"
                else:
                    contextual_input = inject_context(data)
                    inputs = tokenizer([contextual_input], return_tensors="pt")
                    reply_ids = model.generate(**inputs, max_length=100)
                    response = tokenizer.batch_decode(reply_ids, skip_special_tokens=True)[0]
                    response = clean_response(response)

            await websocket.send_text(response)
            log_interaction(data, response)

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        await websocket.send_text("An error occurred.")
        print(f"Error: {e}")

def log_interaction(user, bot):
    logging.info(f"{datetime.now()} | User: {user} | Bot: {bot}")

def clean_response(text):
    text = re.sub(r"[!?.,]{2,}", lambda m: m.group(0)[0], text)
    return text.strip()

def is_out_of_scope(message: str) -> bool:
    allowed_keywords = ["return", "shipping", "order", "product", "track", "cancel", "buy"]
    return not any(word in message.lower() for word in allowed_keywords)
