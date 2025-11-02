# NeuroTrader Deployment Guide

## 🚀 Quick Start

Your NeuroTrader app is now fully deployable! Follow these steps to run it.

## Prerequisites

- Docker and Docker Compose installed
- Port 8000 (Django) and 5432 (PostgreSQL) available

## Step 1: Start Docker Daemon

If Docker isn't running, start it:

```bash
sudo systemctl start docker
```

Verify Docker is running:

```bash
docker --version
```

## Step 2: Configure Environment Variables

The `.env` file has been created from `.env.example`. Update it if needed:

```bash
nano .env  # or use your preferred editor
```

**Important for production:** Change the `SECRET_KEY` to a secure random string!

## Step 3: Build the Containers

Build the Docker images:

```bash
docker compose build
```

This will:

- Build the Django backend with Python 3.11
- Install all dependencies from `requirements.txt`
- Pull PostgreSQL 15 image

## Step 4: Start the Application

Launch all services (web + database):

```bash
docker compose up
```

Or run in detached mode:

```bash
docker compose up -d
```

The entrypoint script will automatically:

1. Wait for PostgreSQL to be ready
2. Run database migrations
3. Collect static files
4. Start Gunicorn server

## Step 5: Verify It's Running

Your Django backend should now be accessible at:

- **Backend API:** http://localhost:8000
- **Django Admin:** http://localhost:8000/admin

Check the logs:

```bash
docker compose logs -f web
```

## Step 6: Create a Superuser (Optional)

To access the Django admin panel:

```bash
docker compose exec web python manage.py createsuperuser
```

## 🛠️ Common Commands

### Stop the application

```bash
docker compose down
```

### Stop and remove volumes (fresh start)

```bash
docker compose down -v
```

### View logs

```bash
docker compose logs -f
docker compose logs web    # Just backend logs
docker compose logs db     # Just database logs
```

### Run Django management commands

```bash
docker compose exec web python manage.py <command>
```

### Rebuild after code changes

```bash
docker compose up --build
```

### Access Django shell

```bash
docker compose exec web python manage.py shell
```

### Access database shell

```bash
docker compose exec db psql -U neurotrader_user -d neurotrader_db
```

## 📁 What Changed

### New Files Created:

- `Dockerfile.backend` - Production-ready Django container
- `entrypoint.sh` - Startup script for migrations & static files
- `.env` - Environment configuration (don't commit this!)
- `.env.example` - Template for environment variables
- `.dockerignore` - Files to exclude from Docker builds
- `DEPLOYMENT.md` - This guide

### Updated Files:

- `requirements.txt` - Added Django, Gunicorn, WhiteNoise, and dependencies
- `neurotrader_project/settings.py` - Environment-based configuration with WhiteNoise
- `docker-compose.yml` - Production-ready service configuration

## 🌐 Frontend Development (Next Steps)

The React frontend in `./frontend/` can be:

### Option 1: Develop Separately

```bash
cd frontend
npm install
npm run dev    # Runs on http://localhost:3000
```

The backend CORS settings already allow `http://localhost:3000`.

### Option 2: Build for Production

Build the frontend and serve via Django:

```bash
cd frontend
npm install
npm run build
```

Then update `docker-compose.yml` to serve frontend static files.

### Option 3: Add Nginx Reverse Proxy

Create an Nginx service in `docker-compose.yml` to route:

- `/api/*` → Django backend (port 8000)
- `/*` → React frontend (port 3000 or static build)

## 🔒 Production Checklist

Before deploying to production:

- [ ] Change `SECRET_KEY` to a secure random string
- [ ] Set `DEBUG=False` in `.env`
- [ ] Update `ALLOWED_HOSTS` with your domain
- [ ] Use a secure `DB_PASSWORD`
- [ ] Update `CORS_ALLOWED_ORIGINS` with your frontend URL
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure volume backups for `postgres_data`
- [ ] Set up logging and monitoring
- [ ] Review Django security checklist: `python manage.py check --deploy`

## 🐛 Troubleshooting

### Port already in use

```bash
# Find and kill process on port 8000
sudo lsof -ti:8000 | xargs kill -9

# Or change the port in docker-compose.yml
```

### Database connection errors

```bash
# Check if db service is healthy
docker compose ps

# Restart database
docker compose restart db
```

### Permission errors

```bash
# Fix permissions on entrypoint script
chmod +x entrypoint.sh

# Or rebuild
docker compose build --no-cache
```

### Static files not loading

```bash
# Manually collect static files
docker compose exec web python manage.py collectstatic --noinput
```

## 📊 Architecture

```
┌─────────────────┐
│   PostgreSQL    │
│   (port 5432)   │
└────────┬────────┘
         │
         │
┌────────▼────────┐
│  Django Backend │
│   + Gunicorn    │
│   + WhiteNoise  │
│   (port 8000)   │
└─────────────────┘
```

## 🎯 Next Steps

1. ✅ Backend is deployable and running
2. 🔄 Set up frontend build integration
3. 🔄 Add CI/CD pipeline (GitHub Actions)
4. 🔄 Deploy to cloud (AWS, GCP, Azure, etc.)
5. 🔄 Add ML model serving endpoints in `predictor/views.py`

## 📝 Notes

- The Intel XPU setup from your original Dockerfile can be re-added if you need GPU acceleration for ML inference
- The `notebooks/` folder is excluded from Docker builds but mounted for development
- Static files are served efficiently via WhiteNoise in production

---

**Your NeuroTrader app is now containerized and ready to deploy! 🎉**
