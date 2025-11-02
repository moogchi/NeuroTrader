# NeuroTrader API Integration

## Overview

The frontend and backend are now fully connected! The React frontend fetches real prediction data from the Django REST API.

## Architecture

```
Frontend (React + Vite)          Nginx Reverse Proxy          Backend (Django)
http://localhost:3000     →      http://localhost:80    →     http://web:8000
                                 /api/* routes
```

## API Endpoints

### Health Check

```bash
GET http://localhost/api/health/
```

Returns:

```json
{
  "status": "healthy",
  "timestamp": "2025-11-02T18:48:50.741527",
  "service": "NeuroTrader API"
}
```

### Get Prediction

```bash
GET http://localhost/api/prediction/?ticker=AAPL
```

Returns:

```json
{
  "ticker": "AAPL",
  "current_price": 159.43,
  "predicted_price": 168.51,
  "prediction_change": 5.7,
  "confidence": 88.77,
  "historical_data": [
    {"date": "2025-10-03", "price": 159.43},
    ...
  ],
  "forecast_data": [
    {"date": "2025-11-03", "price": 168.26, "confidence": 0.87},
    ...
  ],
  "last_updated": "2025-11-02T18:49:09.989867"
}
```

## Files Created/Modified

### Backend

- **`predictor/views.py`**: Added REST API views (`health_check`, `get_prediction`)
- **`neurotrader_project/urls.py`**: Added API URL routes
- **`requirements.txt`**: Includes `djangorestframework`, `django-cors-headers`
- **`settings.py`**: Configured CORS for frontend access

### Frontend

- **`src/api/client.ts`**: API client with TypeScript types
- **`src/hooks/usePrediction.ts`**: React hook for fetching predictions
- **`src/vite-env.d.ts`**: TypeScript environment definitions
- **`src/App.tsx`**: Main app component with API integration
- **`src/components/PredictionCard.tsx`**: Updated to accept real data props
- **`src/components/PriceChart.tsx`**: Updated to display real historical/forecast data
- **`src/components/ForecastTable.tsx`**: Updated to show real forecast data

## How to Run

### Start Backend (Docker)

```bash
cd /home/sihoon/Coding/NeuroTrader
sudo docker compose up -d
```

### Start Frontend (Local)

```bash
cd /home/sihoon/Coding/NeuroTrader/frontend
npm run dev
```

Or use the convenience script:

```bash
./run-frontend.sh
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost/api/
- **Nginx Proxy**: http://localhost:80

## Features

✅ Real-time ticker input with live data fetching
✅ Dynamic prediction cards showing UP/DOWN trend
✅ Confidence scoring (High/Medium/Low)
✅ Interactive price chart with historical + forecast data
✅ 7-day forecast table with confidence intervals
✅ Loading states and error handling
✅ Auto-refresh capability
✅ CORS-enabled API communication
✅ TypeScript type safety throughout

## Next Steps (Future Development)

1. **Real ML Model Integration**: Replace mock data in `views.py` with actual model predictions
2. **Database Models**: Store predictions in PostgreSQL for historical tracking
3. **User Authentication**: Add login/signup for personalized watchlists
4. **Real-time Updates**: WebSocket integration for live price updates
5. **More Indicators**: Technical indicators (RSI, MACD, Bollinger Bands)
6. **Backtesting**: Historical prediction accuracy tracking
7. **Multiple Tickers**: Portfolio view with multiple stock predictions

## Testing API Endpoints

```bash
# Health check
curl http://localhost/api/health/

# Get prediction for AAPL
curl http://localhost/api/prediction/?ticker=AAPL

# Get prediction for TSLA
curl http://localhost/api/prediction/?ticker=TSLA
```

## Troubleshooting

### Port 8000 Connection Refused

- ✅ **Solution**: Use port 80 (nginx) instead of 8000 directly
- The `docker-compose.yml` exposes port 8000 only within the Docker network
- Access backend through nginx: `http://localhost/api/`

### CORS Errors

- Check `CORS_ALLOWED_ORIGINS` in `settings.py` includes your frontend URL
- Currently configured for: `localhost`, `localhost:3000`, `127.0.0.1:3000`, `localhost:80`

### Frontend Can't Fetch Data

- Ensure nginx container is running: `sudo docker compose ps`
- Check nginx logs: `sudo docker compose logs nginx`
- Verify API responds: `curl http://localhost/api/health/`

## Environment Variables

The frontend can use a custom API URL:

```bash
# .env.local (optional)
VITE_API_URL=http://localhost/api
```

Default is `http://localhost/api` if not specified.
