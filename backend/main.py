import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai


# Load environment variables from .env
load_dotenv()

# Get Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Create Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)


# Create FastAPI application
app = FastAPI(title="AI Crop Advisor API")


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request format for /api/chat
class ChatRequest(BaseModel):
    message: str
    location: str | None = None
    soil_type: str | None = None
    weather: dict | None = None
    market_prices: dict | None = None


# Agricultural advisor instructions
SYSTEM_PROMPT = """
You are an expert agricultural advisor.

Your job is to provide practical and easy-to-understand farming advice.

Use the user's:
- Location
- Soil type
- Current weather
- Weather forecast
- Local market prices
- Crop information

When giving advice:
1. Recommend suitable crops when enough information is available.
2. Explain why the crops are suitable.
3. Give an approximate harvest timeline when possible.
4. Give useful selling or market advice when market data is available.
5. Consider weather and soil conditions.
6. Clearly mention when information is missing or uncertain.
7. Never invent current weather or market prices.
8. Use simple language that a farmer can understand.
9. Keep the response practical and concise.
"""


@app.get("/")
def home():
    return {
        "message": "AI Crop Advisor Backend is running!"
    }


@app.post("/api/chat")
def chat(request: ChatRequest):

    user_data = f"""
User message:
{request.message}

Location:
{request.location}

Soil type:
{request.soil_type}

Weather data:
{request.weather}

Market prices:
{request.market_prices}
"""

    prompt = SYSTEM_PROMPT + "\n\n" + user_data

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt
    )

    return {
        "response": response.text
    }