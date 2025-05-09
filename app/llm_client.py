import httpx
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "llama3-8b-8192"  # or "mixtral-8x7b-32768"

async def ask_groq(prompt: str) -> str:
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                url="https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {API_KEY}"},
                json={
                    "model": MODEL_NAME,
                    "messages": [{"role": "user", "content": prompt}]
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.text  # Raw JSON string - parse it however you want later
        except Exception as e:
            print(f"Error: {str(e)}")
            return "LLM Error"