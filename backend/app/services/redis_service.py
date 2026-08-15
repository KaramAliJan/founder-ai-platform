import redis
import json
redis_client=redis.Redis(

    host="redis",
    port=6379,
    decode_responses= True
)

def save_message(conversation_id,role,content):
    key=f"chat:{conversation_id}"

    message={
        "role":role,
        "content":content
    }
    redis_client.rpush(key,json.dumps(message))
    redis_client.ltrim(key,-10,-1)
    redis_client.expire(key,3600)

def retrive_message(conversation_id):
    key=f"chat:{conversation_id}"
    messages=redis_client.lrange(key,0,-1)
    return (json.loads(m) for m in messages)