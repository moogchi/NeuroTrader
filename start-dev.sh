#!/bin/bash

echo "🚀 Starting NeuroTrader with LOCAL frontend development"
echo "========================================================"
echo ""

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo "✅ Dependencies installed!"
    echo ""
fi

# Start backend services (db, web, nginx)
echo "🐳 Starting backend services (Docker)..."
sudo docker compose up -d db web nginx

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check service status
sudo docker compose ps

echo ""
echo "✅ Backend services are running!"
echo ""
echo "🎨 Now starting frontend dev server..."
echo ""

# Start frontend dev server
cd frontend
npm run dev

# When you press Ctrl+C, this message will show
echo ""
echo "🛑 Frontend stopped. Backend is still running."
echo ""
echo "To stop backend services:"
echo "   sudo docker compose down"
