// API Client for NeuroTrader Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

export interface HistoricalDataPoint {
  date: string;
  price: number;
}

export interface ForecastDataPoint {
  date: string;
  price: number;
  confidence: number;
}

export interface PredictionResponse {
  ticker: string;
  current_price: number;
  predicted_price: number;
  prediction_change: number;
  confidence: number;
  historical_data: HistoricalDataPoint[];
  forecast_data: ForecastDataPoint[];
  last_updated: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  service: string;
}

/**
 * Checks if the API is healthy
 */
export async function checkHealth(): Promise<HealthCheckResponse> {
  const response = await fetch(`${API_BASE_URL}/health/`);
  
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetches prediction data for a given ticker symbol
 */
export async function getPrediction(ticker: string): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/prediction/?ticker=${encodeURIComponent(ticker)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch prediction for ${ticker}: ${response.statusText}`);
  }
  
  return response.json();
}
