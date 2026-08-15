from google import genai
from fastapi import Depends
from sqlalchemy.orm import Session
from app.dataset_model import Memory,Decision
from google.genai import types
from app.config import GEMINI_API_KEY
client=genai.Client(api_key=GEMINI_API_KEY)
from app.database.database import sessionLocal
from app.services.embedding_service import gen_embeddings
import json

system_prompt="""You are the memory extraction engine for founderOS.

YOUR JOB:
Extract structured memory records from founder conversations. These records will be stored in a database and retrieved in future conversations using semantic search.

WHAT TO EXTRACT:
Look for any of these in the conversation:
- Decisions: "We decided to...", "I'm going to...", "We will...", "We won't..."
- Goals: "Our goal is...", "We want to reach...", "By Q2 we plan to..."
- Facts: Company name, co-founders, market, stage, funding, team size, tech stack
- Preferences: Things the founder likes/dislikes, values, working style
- Commitments: Promises made, deadlines agreed, things to follow up on

OUTPUT FORMAT (always return valid JSON array, nothing else):

[
  {
    "title": "Short decision title (3-8 words, null if not a decision)",
    "description": "The complete memory in one clear sentence",
    "type": "decision" | "goal" | "fact" | "preference" | "commitment",
    "tags": ["relevant", "keyword", "tags"],
    "importance": 1-5,
    "entities": ["names", "companies", "products mentioned"]
  }
]

RULES:
1. Return [] if nothing worth storing is found. Do not invent memories.
2. Write content in third person: "Founder decided to..." not "I decided to..."
3. Be specific. "Founder decided to raise $500k pre-seed at a $3M cap" beats "Founder wants money."
4. importance 5 = major strategic decision. importance 1 = minor preference or passing comment.
5. Never store small talk, greetings, or generic questions.
6. A single message can produce multiple memory records.

EXAMPLES:
Input: "We decided not to raise until we hit 1000 users. Our startup is called Launchpad."
Output: [
  {"content":"Founder decided not to raise funding until reaching 1000 users","type":"decision","tags":["fundraising","milestone","constraint"],"importance":5,"entities":["Launchpad"]},
  {"content":"Startup name is Launchpad","type":"fact","tags":["company","name"],"importance":3,"entities":["Launchpad"]}
]"""
async def generate_tags(message: str, db: Session):

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=message,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            response_mime_type="application/json"
        )
    )
    print("\n HERE IS THE RESPONSE",response.text)

    try:
        memories = json.loads(response.text)
        print("Parsed memories:", memories)

        for memory in memories:
            new_memory = Memory(
                content=memory["content"],
                type=memory["type"],
                tags=memory["tags"],
                importance=memory["importance"],
            
                embedding=gen_embeddings(memory["content"])
            )
            if (memory[type].strip()=="decision"):
                 new_decision=Decision(
                      project_id=1,
                      title=memory["title"],
                      description=memory["description"]
                    )
                 db.add(new_decision)
                 


            db.add(new_memory)

        db.commit()

    except json.JSONDecodeError:
        return "Invalid JSON returned by Gemini"
    
def retrive_messages(message:str,db:Session):
        memories=db.query(Memory).order_by(Memory.embedding.cosine_distance(message)).limit(5).all()
        return memories


    



