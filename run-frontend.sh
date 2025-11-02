#!/bin/bash

echo "🚀 Starting NeuroTrader Frontend with npm run dev"
echo "================================================"
echo ""

cd "$(dirname "$0")/frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🎨 Starting Vite dev server on http://localhost:3000"
echo "✨ Hot reload enabled - edit files and see changes instantly!"
echo ""
echo "Press Ctrl+C to stop"
echo ""

exec npm run dev -- --host 0.0.0.0
