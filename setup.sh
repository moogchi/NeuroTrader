#!/bin/bash

echo "🚀 Setting up NeuroTrader..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your ALPHA_VANTAGE_API_KEY"
    echo "   Get a free key at: https://www.alphavantage.co/support/#api-key"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Make init script executable
if [ -f init-db.sh ]; then
    chmod +x init-db.sh
    echo "✅ Made init-db.sh executable"
fi

# Stop any running containers
echo ""
echo "🛑 Stopping any existing containers..."
sudo docker compose down -v

# Build and start
echo ""
echo "🏗️  Building and starting backend services..."
sudo docker compose up --build -d

# Wait for database
echo ""
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check status
echo ""
echo "📊 Service status:"
sudo docker compose ps

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
if [ -d "node_modules" ]; then
    echo "✅ node_modules already exists, skipping install"
else
    npm install
fi
cd ..

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✅ Setup complete!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Add your Alpha Vantage API key to .env:"
echo "   nano .env"
echo ""
echo "2. Restart backend if you added API key:"
echo "   sudo docker compose restart web"
echo ""
echo "3. Start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "════════════════════════════════════════════════════════════"
