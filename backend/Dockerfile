FROM python:3.11-slim

WORKDIR /app

# System dependencies for crypto/postgres if needed
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Install faker for the seeder
RUN pip install --no-cache-dir faker

COPY . .

# Run the app
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
