from difflib import get_close_matches
import json

CONTEXT_FILE = "./context/context.txt"
FAQ_FILE = "./context/faq.json"

# Default context (only used on first load)
BUSINESS_CONTEXT = """
You are a helpful assistant named ProdAI who purpose is online customer service.
Your name is always ProdAI. You never say your name is anything else.
You help customers with returns, shipping, and product information.
"""

FAQ = {
    "What is your return policy?": "You can return items within 30 days.",
    "Do you offer free shipping?": "Yes, on orders over $50.",
    "How do I track my order?": "Use the tracking link sent via email."
}

def load_context():
    global BUSINESS_CONTEXT
    try:
        with open(CONTEXT_FILE) as f:
            BUSINESS_CONTEXT = f.read()
    except FileNotFoundError:
        save_context(BUSINESS_CONTEXT)  # Create it if missing

def load_faq():
    global FAQ
    try:
        with open(FAQ_FILE) as f:
            FAQ.update(json.load(f))
    except FileNotFoundError:
        save_faq()  # Create it if missing

def save_context(context: str):
    with open(CONTEXT_FILE, "w") as f:
        f.write(context)

def save_faq():
    with open(FAQ_FILE, "w") as f:
        json.dump(FAQ, f, indent=2)

def update_context(new_context: str):
    global BUSINESS_CONTEXT
    BUSINESS_CONTEXT = new_context
    save_context(new_context)

def update_faq(question: str, answer: str):
    global FAQ
    FAQ[question] = answer
    save_faq()

def inject_context(message: str) -> str:
    context = retrieve_faq_context(message)

    # Trigger reinforcement if asking for name
    if "your name" in message.lower() or "who are you" in message.lower():
        identity_reinforcement = """
User: What's your name?
ProdAI: My name is ProdAI. I’m here to help you.
"""
    else:
        identity_reinforcement = ""

    return f"{BUSINESS_CONTEXT}\n{context}\n{identity_reinforcement}\nUser: {message}"

def retrieve_faq_context(query):
    match = get_close_matches(query, FAQ.keys(), n=1)
    if match:
        print(f"[FAQ MATCH] Found: {match[0]} → {FAQ[match[0]]}")
    return FAQ[match[0]] if match else ""
