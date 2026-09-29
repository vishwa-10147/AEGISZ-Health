@echo off
echo ===================================================
echo      Starting AEGISZ-Health Platform (Hackathon)
echo ===================================================

echo.
echo [1/2] Starting Secure Mesh Network (DBs + Backend API) via Docker...
docker-compose up -d --build

echo.
echo [2/2] Starting React Frontend (Vite with HTTPS)...
:: Open a new command prompt window for the frontend
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo All services have been launched successfully!
echo.
echo - Backend API Docs: http://localhost:8000/docs
echo - Frontend UI (HTTPS Mode): https://localhost:5173
echo.
echo Note: If your browser says "Connection is not private", click "Advanced" -^> "Proceed to localhost"
echo ===================================================
