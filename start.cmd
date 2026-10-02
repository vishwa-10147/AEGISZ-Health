@echo off
cd /d "%~dp0"
echo ===================================================
echo      Starting AEGISZ-Health Platform (Hackathon)
echo ===================================================

echo.
echo [1/2] Starting Secure Mesh Network (DBs + Backend API) via Docker...
docker compose up -d --build
if errorlevel 1 goto failed

echo.
echo Initializing hospital schemas and synthetic demo data...
docker compose exec -T backend mkdir -p /tmp/data/schemas /tmp/data/synthetic
if errorlevel 1 goto failed
docker compose cp .\data\schemas\control.sql backend:/tmp/data/schemas/control.sql
if errorlevel 1 goto failed
docker compose cp .\data\schemas\hospital_a.sql backend:/tmp/data/schemas/hospital_a.sql
if errorlevel 1 goto failed
docker compose cp .\data\schemas\hospital_b.sql backend:/tmp/data/schemas/hospital_b.sql
if errorlevel 1 goto failed
docker compose cp .\data\synthetic\seed.json backend:/tmp/data/synthetic/seed.json
if errorlevel 1 goto failed
docker compose cp .\scripts\seed_db.py backend:/tmp/seed_db.py
if errorlevel 1 goto failed
docker compose exec -T -e PYTHONPATH=/app -w /tmp backend python /tmp/seed_db.py
if errorlevel 1 goto failed
docker compose cp .\scripts\seed_users.py backend:/tmp/seed_users.py
if errorlevel 1 goto failed
docker compose exec -T -e PYTHONPATH=/app -w /tmp backend python /tmp/seed_users.py
if errorlevel 1 goto failed

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
exit /b 0

:failed
echo Startup failed. Check the Docker output above.
exit /b 1
