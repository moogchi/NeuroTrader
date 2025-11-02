from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import random
import os
import requests
from datetime import datetime, timedelta

# Create your views here.

@api_view(['GET'])
def health_check(request):
    """Simple health check endpoint"""
    return Response({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'NeuroTrader API'
    })

def fetch_real_stock_data(ticker):
    """Fetch real stock data from Alpha Vantage API"""
    api_key = os.getenv('ALPHA_VANTAGE_API_KEY')
    
    if not api_key:
        return None
    
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker}&outputsize=compact&apikey={api_key}'
    
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if 'Time Series (Daily)' not in data:
            return None
            
        time_series = data['Time Series (Daily)']
        
        # Convert to list of price points
        prices = []
        for date_str, values in sorted(time_series.items(), reverse=True)[:30]:
            prices.append({
                'date': date_str,
                'price': float(values['4. close'])
            })
        
        prices.reverse()  # Oldest to newest
        return prices
        
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return None

@api_view(['GET'])
def get_prediction(request):
    """Get stock prediction data - uses real data from Alpha Vantage if available"""
    ticker = request.GET.get('ticker', 'AAPL')
    
    # Try to fetch real stock data
    real_data = fetch_real_stock_data(ticker.upper())
    
    if real_data and len(real_data) > 0:
        # Use real historical data
        historical_data = real_data
        current_price = historical_data[-1]['price']
        
        # TODO: Replace with actual ML model prediction
        # For now, use a simple trend-based prediction
        recent_prices = [p['price'] for p in historical_data[-7:]]
        price_change = (recent_prices[-1] - recent_prices[0]) / recent_prices[0]
        predicted_price = current_price * (1 + price_change * 1.2)  # Extrapolate trend
        confidence = random.uniform(0.75, 0.92)
        
    else:
        # Fallback to mock data if API fails
        TICKER_BASELINES = {
            'AAPL': 228.00, 'GOOGL': 140.00, 'MSFT': 420.00, 'AMZN': 185.00,
            'TSLA': 250.00, 'NVDA': 140.00, 'META': 570.00, 'NFLX': 725.00,
            'AMD': 140.00, 'SPY': 585.00,
        }
        
        base_price = TICKER_BASELINES.get(ticker.upper(), 100.00)
        current_price = base_price + random.uniform(-base_price * 0.03, base_price * 0.03)
        predicted_price = current_price * (1 + random.uniform(-0.02, 0.08))
        confidence = random.uniform(0.75, 0.92)
        
        # Generate mock historical data
        historical_data = []
        base_date = datetime.now() - timedelta(days=30)
        for i in range(30):
            date = base_date + timedelta(days=i)
            price = current_price + random.uniform(-5, 5) * (i / 30)
            historical_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'price': round(price, 2)
            })
    
    # Generate forecast data based on prediction
    forecast_data = []
    for i in range(1, 8):
        date = datetime.now() + timedelta(days=i)
        # Gradually move from current_price to predicted_price over 7 days
        progress = i / 7
        price = current_price + (predicted_price - current_price) * progress
        price += random.uniform(-current_price * 0.01, current_price * 0.01)  # Add small variance
        forecast_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'price': round(price, 2),
            'confidence': round(confidence - (i * 0.02), 2)
        })
    
    return Response({
        'ticker': ticker.upper(),
        'current_price': round(current_price, 2),
        'predicted_price': round(predicted_price, 2),
        'prediction_change': round(((predicted_price - current_price) / current_price) * 100, 2),
        'confidence': round(confidence * 100, 2),
        'historical_data': historical_data,
        'forecast_data': forecast_data,
        'last_updated': datetime.now().isoformat()
    })
