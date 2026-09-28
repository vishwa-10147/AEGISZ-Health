.PHONY: help up down backend frontend seed test clean

# Default target
help:
	@echo "AEGISZ-Health Professional Makefile"
	@echo "-----------------------------------"
	@echo "Commands:"
	@echo "  make up          - Start the 7-Node Federated PostgreSQL Mesh (Docker)"
	@echo "  make down        - Stop all Docker databases and remove volumes"
	@echo "  make backend     - Start the FastAPI backend server (Port 8000)"
	@echo "  make frontend    - Start the React frontend server (Port 5173)"
	@echo "  make seed        - Generate and insert massive synthetic FHIR dataset"
	@echo "  make test        - Run the End-to-End API test suite"
	@echo "  make clean       - Remove cached files and node_modules"

# Docker Infrastructure
up:
	@echo "Starting Federated Mesh Network..."
	docker-compose up -d

down:
	@echo "Stopping Database Network..."
	docker-compose down -v

# Backend Server
backend:
	@echo "Starting FastAPI Backend..."
	cmd /c "set PYTHONPATH=backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# Frontend Server
frontend:
	@echo "Starting React Frontend..."
	cd frontend && npm run dev

# Data Seeder
seed:
	@echo "Seeding synthetic data for 6 hospitals..."
	cmd /c "set PYTHONPATH=backend && python scripts/seed_massive.py"

# Testing
test:
	@echo "Running E2E tests..."
	cmd /c "set PYTHONPATH=backend && python test_e2e.py"

# Cleanup
clean:
	@echo "Cleaning up __pycache__ and dependencies..."
	for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d"
	if exist "frontend\node_modules" rd /s /q "frontend\node_modules"
	@echo "Clean complete."
