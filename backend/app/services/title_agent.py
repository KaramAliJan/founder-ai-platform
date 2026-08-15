from google import genai
from app.config import GEMINI_API_KEY
client=genai.Client(api_key=GEMINI_API_KEY)
from app.database.database import sessionLocal
from sqlalchemy.orm import Session
from google.genai import types

system_prompt="""You are the Conversation Title Generator for FounderOS.

YOUR JOB:
Generate a concise title for a founder's conversation.

INPUT:
You will receive the first 1–3 messages of a conversation.

RULES:
1. Return ONLY the title. No explanation, no quotes, no markdown.
2. Maximum 6 words.
3. Capture the main topic or goal of the conversation.
4. Prefer action-oriented titles.
5. If the founder mentions a company, product, or technology, include it when appropriate.
6. Do not use generic titles like:
   - New Chat
   - Conversation
   - Discussion
   - Help Needed
7. Do not include punctuation unless necessary.
8. Use Title Case.
9. If multiple topics exist, choose the primary one.

EXAMPLES

User:
"I want to build an AI company like Tesla."

Output:
Building a Tesla-Like AI Company

---

User:
"Help me design the architecture for my chatbot."

Output:
AI Chatbot Architecture

---

User:
"I need a roadmap for raising a pre-seed round."

Output:
Pre-Seed Fundraising Roadmap

---

User:
"I want to improve retention for my SaaS."

Output:
SaaS Retention Strategy

---

User:
"I'm planning a founder dashboard using FastAPI and React."

Output:
Founder Dashboard Development

---

User:
"I want to create a memory agent using RAG."

Output:
Memory Agent with RAG

IMPORTANT:
Return only the title text.
Nothing else."""

async def generate_title(message:str,db:Session):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=message,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
        )
    )
    return response.text.strip()

    
