import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from prompt_builder import build_prompt

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
Frontend_origin = os.getenv("FRONTEND_ORIGIN")

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

app = FastAPI()

origins = [
    Frontend_origin,
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContentRequest(BaseModel):
    topic: str
    platform: str
    tone: str
    content_type: str
    length: str


def query_model(prompt):
    payload = {
        "model": "meta-llama/Llama-3.3-70B-Instruct:groq",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max_tokens": 300,
        "temperature": 0.7
    }  
    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code != 200:
        print("Error:", response.text)
        return {"error": response.text}

    return response.json()


@app.post("/generate")
def generate_content(request: ContentRequest):

    prompt = build_prompt(
        request.topic,
        request.platform,
        request.tone,
        request.content_type,
        request.length
    )
    result = query_model(prompt)

    return {"output": result["choices"][0]["message"]["content"]}