from langchain_huggingface import HuggingFaceEndpoint
from langchain_huggingface import ChatHuggingFace

from app.config.config import HF_TOKEN, HUGGINGFACE_REPO_ID
from app.common.logger import get_logger
from app.common.custom_exception import CustomException
logger=get_logger(__name__)
def load_llm(hugging_face_repo_id:str=HUGGINGFACE_REPO_ID,hf_token:str=HF_TOKEN):
    try:
        logger.info("Loading LLM from HuggingFace")
        llm=HuggingFaceEndpoint(
            repo_id=hugging_face_repo_id,
            temperature=0.3,
            return_full_text=False,
            huggingfacehub_api_token=hf_token,
            task="conversational"
        )
        chat=ChatHuggingFace(llm=llm)
        
        logger.info("LLM loaded succesfully")
        return chat
    except Exception as e:
        error_message=CustomException("Failed to load llm",e)
        logger.error(str(error_message))