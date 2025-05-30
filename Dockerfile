# Base image
FROM python:3.11

# Set env vars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work dir
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend code
COPY backend/ .

# Collect static files (optional)
RUN python manage.py collectstatic --noinput

# Run migrations (optional)
# CMD ["python", "manage.py", "migrate"] (only needed if you want to run migration automatically)

# Start server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]