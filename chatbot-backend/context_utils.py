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
    "How do I track my order?": "Use the tracking link sent via email.",
    "How long does shipping take?": "Shipping typically takes 5-7 business days, depending on your location.",
    "Can I change my order after it's been placed?": "Unfortunately, once an order is placed, it cannot be modified. Please contact us immediately if there's an issue.",
    "Do you ship internationally?": "Yes, we do offer international shipping. Shipping costs will vary depending on the destination.",
    "What should I do if my order is damaged?": "If your order arrives damaged, please contact us within 7 days of receiving the package for a replacement or refund.",
    "How can I cancel my order?": "You can cancel your order within 1 hour of placing it. After that, we are unable to process cancellations.",
    "Do you accept gift cards?": "Yes, we accept gift cards as payment during checkout.",
    "How can I contact customer service?": "You can contact us through the 'Contact Us' page on our website or by emailing support@example.com.",
    "What payment methods do you accept?": "We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.",
    "How do I return an item?": "To return an item, please visit our returns page and follow the instructions for generating a return label.",
    "Can I return a sale item?": "Sale items are non-returnable unless stated otherwise in the product description.",
    "How do I know if an item is in stock?": "You can check the availability of an item on the product page. If it's out of stock, you can sign up for notifications when it’s back in stock.",
    "Do you offer price adjustments?": "We offer price adjustments within 14 days of purchase if an item goes on sale.",
    "How can I redeem a promo code?": "To redeem a promo code, enter it at checkout in the 'Promo Code' field and click 'Apply'.",
    "Is there a limit to how many items I can buy?": "There is no limit to how many items you can purchase, but some high-demand products may have purchasing limits in place.",
    "How do I reset my password?": "To reset your password, click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
    "Can I modify my shipping address after an order is placed?": "Once an order has been placed, we cannot modify the shipping address. Please contact us immediately for assistance.",
    "What is your name?" : "My name is ProdAI who's a helpful assistant for online customer service."
}

def load_context():
    global BUSINESS_CONTEXT
    try:
        with open(CONTEXT_FILE) as f:
            BUSINESS_CONTEXT = f.read()
    except FileNotFoundError:
        save_context(BUSINESS_CONTEXT)

def load_faq():
    global FAQ
    try:
        with open(FAQ_FILE) as f:
            FAQ.update(json.load(f))
    except FileNotFoundError:
        save_faq()

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

    identity_reinforcement = ""
    if "your name" in message.lower() or "who are you" in message.lower():
        identity_reinforcement = "User: Who are you?\nProdAI: My name is ProdAI. I'm your customer service assistant.\n"

    return f"{BUSINESS_CONTEXT}\n{identity_reinforcement}\n{context}\nUser: {message}"

def retrieve_faq_context(query):
    match = get_close_matches(query, FAQ.keys(), n=1)
    if match:
        print(f"[FAQ MATCH] Found: {match[0]} → {FAQ[match[0]]}")
        return FAQ[match[0]]
    return ""
