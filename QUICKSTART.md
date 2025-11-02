# 🧠 NeuroTrader - Quick Start Guide

## ✨ Run Frontend with `npm run dev`

### Option 1: Use the Quick Start Script (Recommended)

```bash
./run-frontend.sh
```

This will:

- Install dependencies if needed
- Start Vite dev server on http://localhost:3000
- Enable hot module reload (edit and see changes instantly!)

### Option 2: Manual Start

```bash
cd frontend
npm install
npm run dev
```

## 🐳 Backend Services (Docker)

The backend runs in Docker containers. Start them with:

```bash
# Start all backend services
sudo docker compose up -d db web nginx

# View logs
sudo docker compose logs -f

# Stop services
sudo docker compose down
```

## 🌐 Access Your App

| Service         | URL                         | Description                  |
| --------------- | --------------------------- | ---------------------------- |
| **Frontend**    | http://localhost:3000       | React app with hot reload    |
| **Backend API** | http://localhost:8000       | Django REST API              |
| **Admin Panel** | http://localhost:8000/admin | Django admin                 |
| **Nginx Proxy** | http://localhost            | Routes to frontend + backend |

## 📂 Project Structure

```
NeuroTrader/
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.tsx       # Main app component
│   │   ├── components/   # UI components
│   │   └── index.css     # Tailwind styles
│   ├── package.json
│   └── vite.config.ts
├── neurotrader_project/   # Django settings
├── predictor/             # Django app for ML
├── src/                   # ML models & data
├── docker-compose.yml     # Service orchestration
└── run-frontend.sh        # Quick start script
```

## 🎯 Development Workflow

### Frontend Development

1. Start frontend:

   ```bash
   ./run-frontend.sh
   ```

2. Edit files in `frontend/src/` - changes appear instantly!

3. Build for production:
   ```bash
   cd frontend
   npm run build
   ```

### Backend Development

1. Start backend services:

   ```bash
   sudo docker compose up -d
   ```

2. Run Django commands:

   ```bash
   # Create superuser
   sudo docker compose exec web python manage.py createsuperuser

   # Run migrations
   sudo docker compose exec web python manage.py migrate

   # Django shell
   sudo docker compose exec web python manage.py shell
   ```

3. View logs:
   ```bash
   sudo docker compose logs -f web
   ```

## 🔧 Common Commands

```bash
# Frontend
cd frontend
npm run dev          # Start dev server
npm run build        # Production build
npm install <pkg>    # Add dependency

# Backend
sudo docker compose up -d           # Start all services
sudo docker compose down            # Stop all services
sudo docker compose logs -f         # View logs
sudo docker compose exec web bash   # Access container shell
```

## 🛠️ Configuration

### Environment Variables

Edit `.env` to configure:

```bash
# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=neurotrader_db
DB_USER=neurotrader_user
DB_PASSWORD=strongpassword123

# CORS (for frontend)
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 🚀 Deployment

See `DEPLOYMENT.md` for production deployment instructions.

## 📝 Notes

- Frontend runs with `npm run dev` for hot reload during development
- Backend services run in Docker for consistency
- Nginx proxy at port 80 routes requests to appropriate services
- The original `index.css.backup` uses Tailwind v4 syntax (restored if needed)

## 🎉 You're All Set!

Run `./run-frontend.sh` and start building!
