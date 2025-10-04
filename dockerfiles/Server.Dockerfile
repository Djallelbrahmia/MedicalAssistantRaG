FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_ENV=production \
    VECTOR_DB_PATH=/app/vectorestore

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install  -r requirements.txt
 
COPY . .

EXPOSE 5000

CMD ["python", "-m", "app.server"]
