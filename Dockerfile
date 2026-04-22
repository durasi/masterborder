# MasterBorder Backend — Python 3.12 on Railway
FROM python:3.12-slim

# System deps (minimal — build-essential needed for some Python wheels)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps first (cached layer — only rebuilds when requirements change)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY backend/ ./backend/

# Railway injects PORT env var at runtime. Default 8000 for local docker runs.
ENV PORT=8000
EXPOSE 8000

# Bind to 0.0.0.0 so Railway's proxy can reach the container
CMD uvicorn backend.api.main:app --host 0.0.0.0 --port ${PORT}
