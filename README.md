# NeuroTrader 🚀📈

An AI-powered stock price prediction platform that combines machine learning models with real-time market data to forecast stock movements. Built with Django REST Framework backend and React TypeScript frontend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![Django](https://img.shields.io/badge/django-5.2-green.svg)
![React](https://img.shields.io/badge/react-18.3-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Model Performance](#model-performance)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 📊 **Real-time Stock Data**: Fetches live stock prices from Alpha Vantage API
- 🤖 **AI Predictions**: XGBoost machine learning model with 50.82% accuracy (trained on 10 tickers)
- 📰 **News Sentiment Analysis**: 128,000+ headlines analyzed for market sentiment
- 📈 **Interactive Charts**: Beautiful visualizations with 30-day historical and 7-day forecast data
- 🎯 **Confidence Scores**: ML model confidence levels for each prediction (76% recall on "Up" days)
- 🔄 **Multi-Ticker Support**: Track and predict multiple stocks (AAPL, GOOGL, MSFT, TSLA, NVDA, etc.)
- ⚡ **Fast API**: RESTful API built with Django REST Framework
- 🎨 **Modern UI**: Responsive design with Tailwind CSS and Radix UI components
- 🐳 **Docker Ready**: Fully containerized with Docker Compose
- 📱 **Mobile Responsive**: Works seamlessly on all device sizes
- 🔒 **Secure**: Environment-based configuration, CORS protection, secure headers

## 🎬 Demo

```bash
# Start the application
./start.sh

# Open browser to http://localhost:3000
```

Enter any stock ticker (AAPL, GOOGL, MSFT, etc.) to see real-time predictions!

## 🎯 Model Performance

NeuroTrader uses a **tuned XGBoost classifier** trained on 10 diverse stocks with 128,000+ news headlines.

### Key Metrics

- **Accuracy**: 50.82% (statistically significant edge)
- **Precision (Up)**: 0.52
- **Recall (Up)**: 0.76 (successfully identifies 76% of upward movements)
- **Training Data**: 10 tickers (AAPL, MSFT, GOOG, NVDA, AMZN, TSLA, META, KO, DIS, MCD)
- **Features**: 9 engineered features (RSI, MACD, Moving Averages, Sentiment, etc.)

### Why XGBoost?

After rigorous testing of multiple architectures (including LSTM models), XGBoost with engineered features proved superior:

- ✅ Real predictive edge across multiple stocks
- ✅ Robust generalization from multi-ticker training
- ✅ Outperformed deep learning approaches on this problem
- ✅ 76% recall on "Up" days provides actionable trading signals

📊 **[Read Full Model Performance Report →](PROJECT_RESULTS.md)**

## 🛠 Tech Stack

### Backend

- **Django 5.2**: Web framework
- **Django REST Framework 3.14**: RESTful API development
- **PostgreSQL 15**: Primary database
- **Gunicorn 21.2**: Production WSGI server
- **WhiteNoise 6.6**: Static file serving
- **Alpha Vantage API**: Real-time stock market data
- **PyTorch**: LSTM neural network models
- **XGBoost**: Gradient boosting models
- **Pandas & NumPy**: Data processing

### Frontend

- **React 18.3**: Modern UI library
- **TypeScript 5.x**: Type-safe JavaScript
- **Vite 6.3**: Lightning-fast build tool and dev server
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Recharts**: Powerful charting library
- **Lucide React**: Beautiful icon set
- **shadcn/ui**: Re-usable component collection

### Infrastructure

- **Docker & Docker Compose**: Container orchestration
- **Nginx**: Reverse proxy and load balancer
- **GitHub Actions**: CI/CD pipeline (optional)

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│                  http://localhost                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Nginx Reverse Proxy                     │
│                     (Port 80)                            │
│  Routes:                                                 │
│    /          → React Frontend (localhost:3000)          │
│    /api/*     → Django Backend (web:8000)                │
│    /admin/*   → Django Admin (web:8000)                  │
│    /static/*  → Static Files (web:8000)                  │
└──────────┬────────────────────────────┬─────────────────┘
           │                            │
           ▼                            ▼
┌──────────────────┐         ┌──────────────────────┐
│  React Frontend  │         │   Django Backend     │
│  Vite Dev Server │         │   Gunicorn WSGI      │
│   localhost:3000 │         │   Container: web     │
│                  │         │   Port: 8000         │
│  • TypeScript    │         │                      │
│  • Tailwind CSS  │         │  • REST API          │
│  • Recharts      │         │  • ML Models         │
└──────────────────┘         └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │   PostgreSQL DB      │
                             │   Container: db      │
                             │   Port: 5432         │
                             │                      │
                             │  • Stock data cache  │
                             │  • User sessions     │
                             │  • Admin data        │
                             └──────────────────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │  Alpha Vantage API   │
                             │  (External Service)  │
                             │                      │
                             │  • Real stock prices │
                             │  • Historical data   │
                             └──────────────────────┘
```

## 📋 Prerequisites

- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
- **Node.js** (v18+ for local frontend development)
- **Python** (3.11+ if running without Docker)
- **Alpha Vantage API Key** (free at https://www.alphavantage.co/support/#api-key)

### Installation Guides

#### Linux (Ubuntu/Debian)

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Install Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

#### macOS

```bash
# Install via Homebrew
brew install --cask docker
brew install node@18
```

#### Windows

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Install [Node.js](https://nodejs.org/)

## 🚀 Quick Start

### First Time Setup

#### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/moogchi/NeuroTrader.git
cd NeuroTrader

# Run the setup script
chmod +x setup.sh
./setup.sh

# Edit .env to add your Alpha Vantage API key
nano .env
# Add: ALPHA_VANTAGE_API_KEY=your_actual_key_here

# Restart backend to load API key
sudo docker compose restart web

# Start the frontend
cd frontend
npm run dev
```

Open your browser to **http://localhost:3000** 🎉

#### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/moogchi/NeuroTrader.git
cd NeuroTrader

# 1. Create environment file
cp .env.example .env

# 2. Edit .env and add your API key
nano .env
# Add: ALPHA_VANTAGE_API_KEY=your_actual_key_here

# 3. Make scripts executable
chmod +x init-db.sh setup.sh

# 4. Start backend services (PostgreSQL + Django + Nginx)
sudo docker compose down -v  # Clean start
sudo docker compose up --build -d

# 5. Wait for services to be ready
sleep 10
sudo docker compose ps

# 6. Install frontend dependencies
cd frontend
npm install

# 7. Start frontend development server
npm run dev
```

### Subsequent Starts (After First Setup)

```bash
# Start backend
sudo docker compose up -d

# Start frontend (in another terminal)
cd frontend && npm run dev
```

### Option 3: One-Command Start (Legacy)

```bash
# After initial setup, use the start script
./start.sh
```

Open your browser to **http://localhost:3000** 🎉

### Option 4: Manual Docker Setup

```bash
# Start backend services (PostgreSQL + Django + Nginx)
sudo docker compose up -d

# In another terminal, start frontend
cd frontend
npm install
npm run dev
```

Access:

- **Frontend**: http://localhost:3000
- **API**: http://localhost/api/
- **Django Admin**: http://localhost/admin/

## 💻 Development Setup

### Backend Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Access

```bash
# Access PostgreSQL container
sudo docker compose exec db psql -U neurotrader_user -d neurotrader_db

# Common commands
\dt          # List tables
\d+ tablename # Describe table
\q           # Quit
```

## 📡 API Documentation

### Base URL

```
http://localhost/api/
```

### Endpoints

#### 1. Health Check

```http
GET /api/health/
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2025-11-02T12:00:00.000Z",
  "service": "NeuroTrader API"
}
```

#### 2. Get Stock Prediction

```http
GET /api/prediction/?ticker=AAPL
```

**Parameters:**

- `ticker` (string, required): Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)

**Response:**

```json
{
  "ticker": "AAPL",
  "current_price": 228.87,
  "predicted_price": 235.20,
  "prediction_change": 2.77,
  "confidence": 87.5,
  "historical_data": [
    {
      "date": "2025-10-01",
      "price": 225.30
    },
    ...
  ],
  "forecast_data": [
    {
      "date": "2025-11-03",
      "price": 232.10,
      "confidence": 0.87
    },
    ...
  ],
  "last_updated": "2025-11-02T12:00:00.000Z"
}
```

**Supported Tickers:**

- AAPL (Apple)
- GOOGL (Google)
- MSFT (Microsoft)
- AMZN (Amazon)
- TSLA (Tesla)
- NVDA (NVIDIA)
- META (Meta)
- And many more...

### API Rate Limits

Alpha Vantage free tier: **25 requests/day, 5 requests/minute**

If the API limit is reached, the backend falls back to realistic mock data.

## 🔧 Environment Variables

### Backend (.env)

```bash
# Django Settings
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True  # Set to False in production
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Database
DB_NAME=neurotrader_db
DB_USER=neurotrader_user
DB_PASSWORD=strongpassword123
DB_HOST=db  # Use 'localhost' if not using Docker
DB_PORT=5432

# Alpha Vantage API
ALPHA_VANTAGE_API_KEY=YOUR_API_KEY_HERE

# CORS (comma-separated)
CORS_ALLOWED_ORIGINS=http://localhost,http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (.env.local - optional)

```bash
# API Base URL (defaults to http://localhost/api)
VITE_API_URL=http://localhost/api
```

## 📁 Project Structure

```
NeuroTrader/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── api/                # API client and types
│   │   │   └── client.ts       # API integration
│   │   ├── components/         # React components
│   │   │   ├── Header.tsx
│   │   │   ├── PredictionCard.tsx
│   │   │   ├── PriceChart.tsx
│   │   │   ├── ForecastTable.tsx
│   │   │   └── ui/             # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── usePrediction.ts
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── nginx-host.conf         # Nginx proxy config
│
├── neurotrader_project/        # Django project settings
│   ├── settings.py             # Django configuration
│   ├── urls.py                 # URL routing
│   ├── wsgi.py                 # WSGI entry point
│   └── asgi.py                 # ASGI entry point
│
├── predictor/                   # Django app for predictions
│   ├── views.py                # API endpoints
│   ├── models.py               # Database models
│   ├── admin.py                # Django admin config
│   └── migrations/             # Database migrations
│
├── src/                         # ML models and data fetching
│   ├── data_c/                 # Data collection scripts
│   │   ├── get_price_history.py
│   │   ├── get_news_data.py
│   │   └── get_news_data_all.py
│   └── backtest/               # Backtesting utilities
│       └── backtest.py
│
├── notebooks/                   # Jupyter notebooks
│   ├── 01-initial-exploration.ipynb
│   └── 02-multi-ticker-model.ipynb  # LSTM model training
│
├── docker-compose.yml           # Docker orchestration
├── Dockerfile.backend           # Backend Docker image
├── entrypoint.sh                # Container startup script
├── requirements.txt             # Python dependencies
├── manage.py                    # Django CLI
├── .env                         # Environment variables
├── .dockerignore               # Docker ignore rules
├── start.sh                     # Quick start script
└── README.md                    # This file
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Production configuration
- Nginx setup
- SSL/HTTPS configuration
- Cloud deployment (AWS, Azure, GCP)
- Docker Swarm / Kubernetes
- CI/CD pipelines
- Monitoring and logging

### Quick Production Checklist

```bash
# 1. Update environment variables
DEBUG=False
SECRET_KEY=<generate-secure-key>
ALLOWED_HOSTS=yourdomain.com

# 2. Use production database
# Update DB_HOST, DB_PASSWORD with production values

# 3. Set up SSL/HTTPS
# Configure Nginx with Let's Encrypt certificates

# 4. Build production images
docker compose -f docker-compose.prod.yml build

# 5. Deploy
docker compose -f docker-compose.prod.yml up -d

# 6. Run migrations
docker compose exec web python manage.py migrate

# 7. Collect static files
docker compose exec web python manage.py collectstatic --noinput
```

## 🐛 Troubleshooting

### Database Issues

**Error: `role "neurotrader_user" does not exist` or `database "neurotrader_db" does not exist`**

This happens on fresh clones when the database user wasn't created. Fix it with a clean rebuild:

```bash
# Stop all containers and remove volumes
sudo docker compose down -v

# Ensure init script is executable
chmod +x init-db.sh

# Rebuild with fresh database (this will auto-create the user)
sudo docker compose up --build -d

# Verify database is healthy
sudo docker compose ps
```

The `init-db.sh` script will automatically create the database user on first startup.

**Database connection errors:**

```bash
# Wait for database to be ready
sudo docker compose exec web python manage.py migrate

# Check database is healthy
sudo docker compose ps

# If still failing, check logs
sudo docker compose logs db
```

### Docker Issues

**Container won't start:**

```bash
# Check logs
sudo docker compose logs web
sudo docker compose logs db

# Restart services
sudo docker compose restart

# Clean rebuild
sudo docker compose down -v
sudo docker compose up --build
```

### Frontend Issues

**Blank page or API errors:**

```bash
# Check if backend is running
curl http://localhost/api/health/

# Restart frontend
cd frontend
npm run dev
```

**Build errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Issues

**"API key required" errors:**

1. Get free API key: https://www.alphavantage.co/support/#api-key
2. Add to `.env`: `ALPHA_VANTAGE_API_KEY=your_key_here`
3. Restart backend: `sudo docker compose restart web`

**Rate limit exceeded:**

- Alpha Vantage free tier: 25 requests/day
- App falls back to mock data automatically
- Consider upgrading to paid tier for production

## 🧪 Testing

```bash
# Backend tests
python manage.py test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint/Prettier for TypeScript/React
- Write tests for new features
- Update documentation
- Keep commits atomic and well-described

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for stock market data
- [Django](https://www.djangoproject.com/) for the robust backend framework
- [React](https://react.dev/) for the powerful UI library
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [shadcn/ui](https://ui.shadcn.com/) for component primitives
- All contributors and supporters

## 📞 Support

- 📧 Email: support@neurotrader.com
- 💬 Discord: [Join our community](https://discord.gg/neurotrader)
- 🐛 Issues: [GitHub Issues](https://github.com/moogchi/NeuroTrader/issues)
- 📖 Docs: [Full Documentation](https://docs.neurotrader.com)

---

**Built with ❤️ by the NeuroTrader Team**

⭐ Star this repo if you find it useful!
