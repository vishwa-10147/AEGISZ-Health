from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import get_settings

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Database setup
    yield
    # Shutdown: Clean up resources

app = FastAPI(
    title="AEGISZ-Health API",
    description="Quantum-safe federated EHR exchange platform",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    from app.api.router import api_router
    app.include_router(api_router, prefix="/api/v1")
except ImportError:
    pass

@app.get("/")
async def root():
    return {"service": "AEGISZ-Health", "version": "0.1.0"}
