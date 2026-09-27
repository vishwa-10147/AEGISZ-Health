.PHONY: dev dev-backend dev-frontend test test-security seed reset lint clean demo

dev:
	docker-compose up --build

dev-backend:
	cd backend && uvicorn app.main:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev

test:
	cd backend && pytest -v

test-security:
	cd backend && pytest -v tests/test_auth.py tests/test_authorization.py tests/test_crypto.py

seed:
	cd backend && python -m scripts.seed_db

reset:
	cd backend && python -m scripts.reset_db

lint:
	cd backend && ruff check . && cd ../frontend && npm run lint

clean:
	docker-compose down -v

demo:
	cd backend && python -m scripts.run_demo
