"""MasterBorder FastAPI application entry point."""

from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MasterBorder API",
    description="Cross-border trade compliance dashboard — built with Opus 4.7",
    version="0.1.0",
)

# CORS: Next.js frontend will call from a different origin (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check and API info."""
    return {
        "service": "MasterBorder API",
        "version": "0.1.0",
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "message": "Ready to analyze cross-border trade compliance.",
    }


@app.get("/health")
async def health():
    """Simple health check for deploy monitoring."""
    return {"status": "healthy"}
