@echo off
echo ===================================================
echo      Starting AEGISZ-Health Platform (Hackathon)
echo ===================================================

echo.
echo [1/3] Starting PostgreSQL Databases via Docker...
docker-compose up -d

echo.
echo [2/3] Starting FastAPI Backend (Port 8000)...
:: Open a new command prompt window for the backend
start cmd /k "cd backend && pip install -r requirements.txt && python -m uvicorn app.main:app --reload --port 8000"

echo.
echo [3/3] Starting React Frontend (Vite)...
:: Open a new command prompt window for the frontend
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo All services have been launched in separate windows!
echo.
echo - Backend API Docs: http://localhost:8000/docs
echo - Frontend UI: Check the Node.js window for the URL (usually http://localhost:5173)
echo ===================================================
