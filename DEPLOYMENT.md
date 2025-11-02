# NeuroTrader Deployment Guide 🚀

Complete guide for deploying NeuroTrader to production environments.

## 📋 Table of Contents

- [Production Checklist](#production-checklist)
- [Quick Production Deploy](#quick-production-deploy)
- [Environment Configuration](#environment-configuration)
- [Cloud Deployment](#cloud-deployment)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Database Configuration](#database-configuration)
- [Monitoring & Logging](#monitoring--logging)
- [Security Best Practices](#security-best-practices)

## ✅ Production Checklist

Before deploying:

- [ ] Alpha Vantage API Key obtained
- [ ] Domain name configured
- [ ] SSL certificate ready
- [ ] Production database set up
- [ ] Environment variables configured
- [ ] DEBUG set to False
- [ ] SECRET_KEY changed
- [ ] ALLOWED_HOSTS configured
- [ ] Database backups automated
- [ ] Monitoring tools set up

## 🚀 Quick Production Deploy

```bash
# 1. Clone and configure
git clone https://github.com/moogchi/NeuroTrader.git
cd NeuroTrader

# 2. Set up environment
cp .env .env.production
nano .env.production  # Edit with production values

# 3. Generate secure SECRET_KEY
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# 4. Update .env.production
# - Set DEBUG=False
# - Add your SECRET_KEY
# - Set ALLOWED_HOSTS=yourdomain.com
# - Add ALPHA_VANTAGE_API_KEY

# 5. Build and deploy
sudo docker compose -f docker-compose.prod.yml up --build -d

# 6. Run migrations
sudo docker compose exec web python manage.py migrate

# 7. Create superuser
sudo docker compose exec web python manage.py createsuperuser

# 8. Collect static files
sudo docker compose exec web python manage.py collectstatic --noinput
```

## 🔧 Production Environment Variables

`.env.production`:

```bash
# Django
SECRET_KEY=<50+ char random string>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DB_NAME=neurotrader_prod
DB_USER=neurotrader_user
DB_PASSWORD=<secure-password>
DB_HOST=<db-host>  # Use managed DB in production
DB_PORT=5432

# API
ALPHA_VANTAGE_API_KEY=<your-production-key>

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

## ☁️ Cloud Deployment

### AWS EC2

```bash
# 1. Launch Ubuntu 22.04 instance (t3.medium)
# 2. Configure security group: ports 80, 443, 22

# 3. SSH and install dependencies
ssh ubuntu@your-ec2-ip
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
sudo apt install docker-compose-plugin

# 4. Clone and deploy
git clone https://github.com/moogchi/NeuroTrader.git
cd NeuroTrader
# Configure .env.production
sudo docker compose -f docker-compose.prod.yml up -d
```

### Use AWS RDS for Database
- Create PostgreSQL 15 instance
- Update DB_HOST in .env.production
- Enable automated backups

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Certificates location
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem

# Auto-renewal
sudo certbot renew --dry-run
```

## 💾 Database Backups

Create `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker compose exec -T db pg_dump -U neurotrader_user neurotrader_db > backup_$DATE.sql
gzip backup_$DATE.sql
```

Add to crontab:
```bash
0 2 * * * /path/to/backup.sh
```

## 📊 Monitoring

### Check Application Status

```bash
# View logs
sudo docker compose logs -f web

# Check container status
sudo docker compose ps

# Test API
curl https://yourdomain.com/api/health/
```

### Set Up Monitoring (Optional)

```bash
# Add Prometheus + Grafana
sudo docker compose -f docker-compose.monitoring.yml up -d
```

## 🛡️ Security Best Practices

1. **Use HTTPS everywhere**
2. **Strong passwords** for database
3. **Regular updates**: `docker compose pull && docker compose up -d`
4. **Firewall**: Only allow ports 80, 443, 22
5. **SSH key-based** authentication only
6. **Managed database** service (RDS, Cloud SQL)
7. **Regular backups**
8. **Rate limiting** in Nginx
9. **Hide error details** (DEBUG=False)
10. **Monitor logs** for suspicious activity

## 🐛 Troubleshooting

**502 Bad Gateway:**
```bash
sudo docker compose logs web
sudo docker compose restart web
```

**Database connection errors:**
```bash
sudo docker compose exec db pg_isready
sudo docker compose exec web python manage.py migrate
```

**Static files not loading:**
```bash
sudo docker compose exec web python manage.py collectstatic --noinput
```

## 📞 Support

Issues? Open a ticket: https://github.com/moogchi/NeuroTrader/issues

---

**Production Ready!** 🎉
