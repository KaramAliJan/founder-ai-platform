from fastapi import APIRouter,WebSocket,WebSocketDisconnect,Depends
from app.services.gemini_services import gen_response
from pydantic import BaseModel
from app.services.embedding_service import gen_embeddings
from app.database.database import getdb
from sqlalchemy.orm import Session
from app.dataset_model import Message,Memory
from app.services.memory_agent import generate_tags
from app.services.memory_agent import retrive_messages
from app.services.redis_service import retrive_message
from app.services.title_agent import generate_title
from app.services.orchestrator import master_orchestrator
import json
router = APIRouter()


full_resposne=""
@router.websocket("/ws/chat")
async def websocket_connection(websocket:WebSocket,conversation_id:int,db:Session=Depends(getdb)):
    context=""
    count=0
    await websocket.accept()
    try:
       user_message=await websocket.receive_text()
       if (count==3):
           conversaion_title=generate_title(user_message) #For generating the title of the conversation
           del count
       count+=1
       user_embeddings=gen_embeddings(user_message)       #For generating the embedding of the user message
       memories=retrive_messages(user_embeddings,db)      #Retrive the messages from the memory on the cosine similarity of user embedding
       for memo in memories:                              
           context+=f"-{memo.content}"                    #Creating the context for the next response
       redis_context=retrive_message(conversation_id)     #Retrive the last 10 cache memories
       for con in redis_context:
           context+=f"-{con}"                       
                           
       print("\nbefore\n")
       await generate_tags(user_message,db)
       print("\nafter\n")
       
    
       message=Message(sender="user",content=user_message,embedding=user_embeddings)
       db.add(message)
       db.commit()

       full_response=""
       async for chunks in gen_response(user_message,context):
           full_response+=chunks
           await websocket.send_text(chunks)
       await websocket.send_text("[DONE]")
       assistant_embeddings=gen_embeddings(full_response)
       message=Message(sender="assistant",content=full_response,embedding=assistant_embeddings)
       db.add(message)
       db.commit()
       orch_response=master_orchestrator(user_message)
       agents=orch_response["agents"]
       for agent in agents:
           if (agent.strip()=="contradiction"):
            print("HI")
           if (agent.strip()=="task"):
            print("HI")
           if (agent.strip()=="reflection"):
            print("HI")
           if (agent.strip()=="strategy"):  
            print("HI")      
    except WebSocketDisconnect:
        print("CLient Disconnected")

       

