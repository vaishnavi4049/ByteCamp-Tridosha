from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv("../.env")

app = FastAPI()

# Load API key
API_KEY = os.getenv("FEATHERLESS_API_KEY")

if not API_KEY:
    raise ValueError("FEATHERLESS_API_KEY not found in environment variables")

# OpenAI compatible client for Featherless
client = OpenAI(
    base_url="https://api.featherless.ai/v1",
    api_key=API_KEY
)

class ChatRequest(BaseModel):
    message: str

# Conversation memory
conversation_history = []

SYSTEM_PROMPT = """You are ChronoCare AI, a warm and knowledgeable assistant specializing in 
chronobiology and how the body's 24-hour circadian clock influences medication timing and health.

PERSONALITY: Friendly, clear, and professionally supportive. Think of a knowledgeable health 
educator — not a doctor.

CORE KNOWLEDGE AREAS:
- Circadian rhythms: hormone cycles, blood pressure patterns, body temperature, cortisol rhythms, melatonin cycles
- Chronopharmacology: how drug absorption, metabolism, and efficacy vary by time of day
- Medication categories and general timing principles: antihypertensives, statins, antihistamines, 
  asthma medications, corticosteroids, diabetes medications, NSAIDs, supplements (vitamin D, 
  melatonin, iron, magnesium)
- Sleep hygiene: light exposure, meal timing, exercise timing, and their effects on circadian health
- Chrono-nutrition: meal timing and metabolic rhythms

RESPONSE STRUCTURE (always follow this pattern):
1. Give a warm, direct answer to the question (2-4 sentences max)
2. Add a "Key Insight" with a concise biological explanation
3. Share a practical tip the person can actually use
4. End with ONE relevant follow-up question OR two short suggestions to continue the conversation

MEMORY: You have access to the conversation history. Reference what the user shared earlier 
(e.g. if they mentioned a condition, their schedule, or a medication).

FORMATTING RULES:
- Use short paragraphs
- Bold key terms using markdown
- Keep responses around 100-200 words
- End with a follow-up question or suggestions

SAFETY RULES:
- Never prescribe medications
- Never give dosage advice
- Never diagnose diseases
- Encourage consulting healthcare professionals
"""

WELCOME_MESSAGE = """
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Welcome to ChronoCare AI 🕐
  Circadian Rhythm & Medication Timing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hello! I'm ChronoCare AI — your guide to understanding how your
body's internal clock affects medication timing and wellness.

Chronobiology tells us that *when* you take a medication can be
just as important as *what* you take.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

@app.get("/")
def root():
    return {"message": "Chronotherapy AI service running"}

@app.post("/chat")
def chat(req: ChatRequest):

    global conversation_history

    try:

        # Add user message to history
        conversation_history.append({
            "role": "user",
            "content": req.message
        })

        # Keep last 6 messages only
        conversation_history = conversation_history[-6:]

        # Prepare messages
        messages = [{"role": "system", "content": SYSTEM_PROMPT}] + conversation_history

        # Call Featherless model
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct",
            max_tokens=4096,
            temperature=0.3,
            messages=messages
        )

        reply = completion.choices[0].message.content

        # Save assistant reply
        conversation_history.append({
            "role": "assistant",
            "content": reply
        })

        conversation_history = conversation_history[-6:]

        return {"reply": reply}

    except Exception as e:

        print("ERROR:", str(e))

        return {"error": str(e)}