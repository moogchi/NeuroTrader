#!/bin/bash

echo "=================================================="
echo "NeuroTrader - Database Connection Troubleshooter"
echo "=================================================="
echo ""

# Check if .env exists
echo "1. Checking .env file..."
if [ -f .env ]; then
    echo "   ✅ .env file exists"
    echo ""
    echo "   Database configuration in .env:"
    grep "^DB_" .env | sed 's/^/   /'
    echo ""
else
    echo "   ❌ .env file NOT FOUND!"
    echo "   Solution: cp .env.example .env"
    echo ""
fi

# Check docker-compose.yml
echo "2. Checking docker-compose.yml database config..."
if [ -f docker-compose.yml ]; then
    echo "   ✅ docker-compose.yml exists"
    echo ""
    echo "   PostgreSQL environment variables:"
    grep -A 3 "POSTGRES_" docker-compose.yml | sed 's/^/   /'
    echo ""
else
    echo "   ❌ docker-compose.yml NOT FOUND!"
    echo ""
fi

# Check if containers are running
echo "3. Checking Docker containers..."
if command -v docker &> /dev/null; then
    echo ""
    docker compose ps
    echo ""
else
    echo "   ❌ Docker not found!"
    echo ""
fi

# Check database container logs
echo "4. Checking database container logs (last 20 lines)..."
echo "=================================================="
docker compose logs --tail=20 db 2>/dev/null || echo "Cannot read database logs (container may not be running)"
echo "=================================================="
echo ""

# Check web container logs
echo "5. Checking web container logs (last 20 lines)..."
echo "=================================================="
docker compose logs --tail=20 web 2>/dev/null || echo "Cannot read web logs (container may not be running)"
echo "=================================================="
echo ""

# Test database connection
echo "6. Testing direct database connection..."
if docker compose ps | grep -q "neurotrader_db.*Up"; then
    echo "   Attempting to connect to database..."
    docker compose exec -T db psql -U neurotrader_user -d neurotrader_db -c "SELECT version();" 2>&1 | head -5
    if [ $? -eq 0 ]; then
        echo "   ✅ Database connection successful!"
    else
        echo "   ❌ Database connection failed!"
    fi
else
    echo "   ⚠️  Database container is not running"
fi
echo ""

# Recommendations
echo "=================================================="
echo "COMMON FIXES:"
echo "=================================================="
echo ""
echo "If you see 'role neurotrader_user does not exist':"
echo "   sudo docker compose down -v"
echo "   sudo docker compose up --build -d"
echo ""
echo "If .env file is missing:"
echo "   cp .env.example .env"
echo "   nano .env  # Add your ALPHA_VANTAGE_API_KEY"
echo ""
echo "If containers won't start:"
echo "   sudo docker compose down"
echo "   sudo docker compose up --build -d"
echo ""
echo "To see live logs:"
echo "   sudo docker compose logs -f"
echo ""
echo "To reset everything (DELETES ALL DATA):"
echo "   sudo docker compose down -v"
echo "   sudo docker compose up --build -d"
echo ""
echo "=================================================="
