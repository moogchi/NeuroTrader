#!/bin/bash
set -e

echo "======================================="
echo "Starting NeuroTrader Backend..."
echo "======================================="
echo "Database Configuration:"
echo "  DB_HOST: ${DB_HOST:-db}"
echo "  DB_PORT: ${DB_PORT:-5432}"
echo "  DB_NAME: ${DB_NAME:-neurotrader_db}"
echo "  DB_USER: ${DB_USER:-neurotrader_user}"
echo "======================================="

echo "Waiting for PostgreSQL..."
MAX_RETRIES=30
RETRY_COUNT=0

while ! pg_isready -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -U "${DB_USER:-neurotrader_user}" > /dev/null 2>&1; do
  RETRY_COUNT=$((RETRY_COUNT+1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "ERROR: PostgreSQL did not become ready in time!"
    echo "Please check:"
    echo "  1. Database container is running: docker compose ps"
    echo "  2. Database logs: docker compose logs db"
    echo "  3. .env file has correct DB_* variables"
    exit 1
  fi
  echo "Waiting for PostgreSQL... (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep 2
done
echo "✅ PostgreSQL is ready!"

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "======================================="
echo "✅ Application ready!"
echo "======================================="
exec "$@"
