import os
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from app.components.llm import load_llm
from app.components.vector_store import load_vector_store,save_vectore_store
from app.components.pdf_loader import load_pdf_files , create_text_chunks
from app.config.config import HF_TOKEN,HUGGINGFACE_REPO_ID
from app.common.logger import get_logger
from app.common.custom_exception import CustomException
logger=get_logger(__name__)
CUSTOM_PROMPT_TEMPLATE = """
You are a helpful and friendly medical assistant. 
Please answer the following question in 2–3 sentences, 
making your response clear, supportive, and easy to understand. 
Only use the information provided in the context.

Context:
{context}

Question:
{question}

Answer:
"""

def set_custom_prompt():
    return PromptTemplate(template=CUSTOM_PROMPT_TEMPLATE,input_variables=['context','question'])


def create_qa_chain():
    try:
        logger.info("Loading vector store for context")
        db=load_vector_store()
        if db is None :
            documents=load_pdf_files()
            chunks=create_text_chunks(documents)
            db=save_vectore_store(chunks)
            if db is None:
                raise CustomException("Vector store not present or empty")
        llm=load_llm(hugging_face_repo_id=HUGGINGFACE_REPO_ID,hf_token=HF_TOKEN)
        if llm is None :
            raise CustomException("LLM not loaded ")
        qa_chain=RetrievalQA.from_chain_type(            llm=llm,
            chain_type="stuff",
            retriever=db.as_retriever(search_kwargs={"k":1}),
            return_source_documents=False,
            chain_type_kwargs={'prompt':set_custom_prompt()})
        logger.info("Succesfully created the QA chain")

        return qa_chain
    except Exception as e: 
        error_message=CustomException("Failed to create QA chain",e)
        logger.error(str(error_message))
        raise error_message