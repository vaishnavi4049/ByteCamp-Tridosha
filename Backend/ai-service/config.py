import os
from dotenv import load_dotenv

load_dotenv("../.env")

RECUSAL_API_KEY = os.getenv("HF_TOKEN")

if not RECUSAL_API_KEY:
    raise ValueError("HF_TOKEN not found in environment variables")