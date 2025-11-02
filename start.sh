#!/bin/bash
set -e

echo "🚀 Starting NeuroTrader Full Stack Application"
echo "=============================================="
echo ""

# Check if Docker is running
if ! sudo docker info > /dev/null 2>&1; then
    echo "⚠️  Docker daemon is not running!"
    echo "Starting Docker daemon (requires sudo)..."
    sudo systemctl start docker
    sleep 2
fi

echo "✓ Docker is running"
echo ""

# Set Docker context to default if needed
CURRENT_CONTEXT=$(docker context show 2>/dev/null || echo "default")
if [ "$CURRENT_CONTEXT" != "default" ]; then
    echo "📝 Switching to default Docker context..."
    docker context use default
fi

# Remove obsolete version field warning
if grep -q "^version:" docker-compose.yml 2>/dev/null; then
    echo "📝 Removing obsolete 'version' field from docker-compose.yml..."
    sed -i '/^version:/d' docker-compose.yml
fi

# Build the containers
echo "🔨 Building containers..."
sudo docker compose build

echo ""
echo "✅ Build complete!"
echo ""
echo "🌐 Starting services..."
echo "   - Database (PostgreSQL) on port 5432"
echo "   - Backend (Django) on internal port 8000"
echo "   - Frontend (React + Nginx) on port 80"
echo ""

# Start the services
sudo docker compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check service status
sudo docker compose ps

echo ""
echo "✅ All services are up!"
echo ""
echo "🎉 NeuroTrader is now running at:"
echo "   👉 http://localhost"
echo ""
echo "📊 Additional endpoints:"
echo "   - Django Admin: http://localhost/admin"
echo "   - API: http://localhost/api"
echo "   - Backend Direct: http://localhost:8000 (internal)"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: sudo docker compose logs -f"
echo "   - Stop: sudo docker compose down"
echo "   - Restart: sudo docker compose restart"
echo ""
