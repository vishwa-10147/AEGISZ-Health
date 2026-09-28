from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
import app.api.health as health

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Quantum-Safe Federated Electronic Health Record Exchange",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)

@app.get("/", tags=["System"])
async def root():
    return {"service": settings.PROJECT_NAME, "version": settings.VERSION}
