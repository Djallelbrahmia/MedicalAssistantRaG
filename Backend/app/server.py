from flask import Flask, session, request, jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import timedelta
import redis
import os
import json
from dotenv import load_dotenv
import sys
from app.components.retriever import create_qa_chain
from app.common.logger import get_logger
from app.common.custom_exception import CustomException
from flask_cors import CORS
import base64

logger=get_logger(__name__)

load_dotenv()


app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
CORS(app)
jwt = JWTManager(app)

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

redis_client = redis.from_url(REDIS_URL, decode_responses=True)
try:
    qa_chain = create_qa_chain()
    if qa_chain is None:
        raise CustomException("QA chain could not be created (LLM or VectorStore issue)")
except Exception as e:
    error_msg = f"Error : {str(e)}"
    logger.error(error_msg)
    sys.exit(1) 

@app.route("/start_chat" , methods=["GET"])
def index():
    auth_header = request.headers.get("Authorization")
    if not auth_header: 
        user_id = base64.urlsafe_b64encode(os.urandom(24)).decode("utf-8")

        token = create_access_token(identity=user_id)

        redis_client.setex(f"token:{user_id}", 86400, token)

        return jsonify({"msg": "New token issued", "token": f"Bearer {token}"}), 201

    return jsonify({"msg": "Token already provided"}), 200       

@app.route("/chat", methods=["POST"])
@jwt_required()
def chat():
    user_id = get_jwt_identity()
    token_in_redis = redis_client.get(f"token:{user_id}")

    if not token_in_redis:
        return jsonify({"error": "Token expired or revoked"}), 401

    data = request.json
    user_input = data.get("message", "")


    pipe = redis_client.pipeline()

    pipe.rpush(f"chat:{user_id}", json.dumps({"role": "user", "content": user_input}))

    response = qa_chain.invoke({"query": user_input})
    result = response.get("result", "No response")
    pipe.rpush(f"chat:{user_id}", json.dumps({"role": "assistant", "content": result}))

    pipe.lrange(f"chat:{user_id}", 0, -1)

    _, _, messages = pipe.execute()

    messages = [json.loads(m) for m in messages]

    return jsonify({
        "user": user_id,
        "messages": messages,
    })

@app.route("/clear", methods=["POST","DELETE"])
@jwt_required()
def clear_history():
    user_id = get_jwt_identity()
    redis_client.delete(f"chat:{user_id}")
    return jsonify({"msg": "Chat history cleared"})

@app.route("/history", methods=["GET"])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    messages = redis_client.lrange(f"chat:{user_id}", 0, -1)
    messages = [json.loads(m) for m in messages]
    return jsonify({
        "user": user_id,
        "messages": messages,
    })
if __name__=="__main__":
    app.run(host="0.0.0.0" , port=5000 , debug=False , use_reloader = False)