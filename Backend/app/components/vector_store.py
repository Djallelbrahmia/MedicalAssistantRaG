import os
from langchain_community.vectorstores import FAISS
from app.components.embeddings import get_embedding_model
from app.common.logger import get_logger
from app.common.custom_exception import CustomException
from app.config.config import DB_FAISS_PATH

logger=get_logger(__name__)

def load_vector_store():
    try:
        embedding_model=get_embedding_model()
        if os.path.exists(DB_FAISS_PATH):
            logger.info("Loading existing vector data store") 
            return FAISS.load_local(
                DB_FAISS_PATH,
                embedding_model,
                allow_dangerous_deserialization=True
            )
        else :
            logger.warning("No vectore store found")
    except Exception as e:
        error_message=CustomException("Failed to load vectorestore",e)
        logger.error(str(error_message))

def save_vectore_store(text_chunks):
    try:
        if not text_chunks :
            raise CustomException("No chunks are found")
        logger.info("Generating your new vectorstore")
        emnedding_model=get_embedding_model()
        db=FAISS.from_documents(text_chunks,emnedding_model)
        logger.info("Saving vectore store")
        db.save_local(DB_FAISS_PATH)
        logger.info("Vectors store saved succesfully")
        return db
    except Exception as e: 
        error_message=CustomException("Failed to create new vectors store",e)
        logger.error(str(error_message))
        raise error_message
