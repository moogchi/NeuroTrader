# NeuroTrader - Quick Reference Card

## 🎯 First Time Setup

```bash
# Clone repository
git clone https://github.com/moogchi/NeuroTrader.git
cd NeuroTrader

# Option 1: Automated (Recommended)
chmod +x setup.sh
./setup.sh

# Option 2: Manual
cp .env.example .env
nano .env  # Add your ALPHA_VANTAGE_API_KEY
chmod +x init-db.sh
sudo docker compose down -v
sudo docker compose up --build -d
cd frontend && npm install && npm run dev
```

## 🚀 Start Application (After Setup)

```bash
# Option 1: Everything at once
./start.sh

# Option 2: Manual
sudo docker compose up -d      # Backend
cd frontend && npm run dev      # Frontend
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **API**: http://localhost/api/
- **Admin**: http://localhost/admin/
- **Health**: http://localhost/api/health/

## 📡 API Endpoints

```bash
# Health check
GET /api/health/

# Get prediction (replace AAPL with any ticker)
GET /api/prediction/?ticker=AAPL
```

## 🛠 Common Commands

### Docker

```bash
# Start services
sudo docker compose up -d

# Stop services
sudo docker compose down

# View logs
sudo docker compose logs -f web

# Restart service
sudo docker compose restart web

# Rebuild
sudo docker compose up --build -d

# Check status
sudo docker compose ps
```

### Django

```bash
# Run migrations
sudo docker compose exec web python manage.py migrate

# Create superuser
sudo docker compose exec web python manage.py createsuperuser

# Collect static files
sudo docker compose exec web python manage.py collectstatic

# Django shell
sudo docker compose exec web python manage.py shell

# Run management command
sudo docker compose exec web python manage.py <command>
```

### Database

```bash
# Access PostgreSQL
sudo docker compose exec db psql -U neurotrader_user -d neurotrader_db

# Backup database
sudo docker compose exec -T db pg_dump -U neurotrader_user neurotrader_db > backup.sql

# Restore database
cat backup.sql | sudo docker compose exec -T db psql -U neurotrader_user neurotrader_db
```

### Frontend

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔑 Environment Variables

Edit `.env` file:

```bash
# Required
ALPHA_VANTAGE_API_KEY=your_key_here

# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=neurotrader_db
DB_USER=neurotrader_user
DB_PASSWORD=strongpassword123
DB_HOST=db
DB_PORT=5432
```

## 📊 Supported Stock Tickers

```
AAPL  - Apple
GOOGL - Google/Alphabet
MSFT  - Microsoft
AMZN  - Amazon
TSLA  - Tesla
NVDA  - NVIDIA
META  - Meta/Facebook
NFLX  - Netflix
AMD   - AMD
SPY   - S&P 500 ETF
... and many more!
```

## 🐛 Quick Troubleshooting

| Issue                    | Solution                                                           |
| ------------------------ | ------------------------------------------------------------------ |
| `neurotrader_user` error | `sudo docker compose down -v && sudo docker compose up --build -d` |
| 502 Bad Gateway          | `sudo docker compose restart web`                                  |
| Database errors          | `sudo docker compose exec web python manage.py migrate`            |
| Frontend blank           | Check console, restart `npm run dev`                               |
| Port in use              | `sudo lsof -ti:PORT \| xargs kill -9`                              |
| Docker issues            | `sudo docker compose down -v && sudo docker compose up --build -d` |
| Static files missing     | `sudo docker compose exec web python manage.py collectstatic`      |
| Missing API key          | Edit `.env`, add key, then `sudo docker compose restart web`       |

## 📁 Project Structure

```
NeuroTrader/
├── frontend/          # React app
│   ├── src/
│   │   ├── api/       # API client
│   │   ├── components/# UI components
│   │   └── hooks/     # Custom hooks
│   └── package.json
├── predictor/         # Django app
│   ├── views.py       # API endpoints
│   └── models.py      # Database models
├── neurotrader_project/  # Django config
│   ├── settings.py
│   └── urls.py
├── notebooks/         # Jupyter notebooks
├── docker-compose.yml # Docker config
└── .env              # Environment vars
```

## 🧪 Test Commands

```bash
# Test API health
curl http://localhost/api/health/

# Test prediction endpoint
curl http://localhost/api/prediction/?ticker=AAPL

# Test with different ticker
curl http://localhost/api/prediction/?ticker=TSLA

# Pretty print JSON
curl -s http://localhost/api/prediction/?ticker=AAPL | python3 -m json.tool
```

## 📝 Useful URLs

- **Alpha Vantage**: https://www.alphavantage.co/support/#api-key
- **Django Docs**: https://docs.djangoproject.com/
- **React Docs**: https://react.dev/
- **Tailwind**: https://tailwindcss.com/docs

## 🔒 Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Change `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Add Alpha Vantage API key
- [ ] Set up SSL/HTTPS
- [ ] Use managed database
- [ ] Enable backups
- [ ] Configure monitoring
- [ ] Set up logging

---

**Keep this handy!** 📌
