import { useState } from 'react';
import { Header } from './components/Header';
import { PredictionCard } from './components/PredictionCard';
import { PriceChart } from './components/PriceChart';
import { ForecastTable } from './components/ForecastTable';
import { usePrediction } from './hooks/usePrediction';

export default function App() {
  const [ticker, setTicker] = useState('AAPL');
  const { data, loading, error, refetch } = usePrediction(ticker);

  return (
    <div className="min-h-screen bg-slate-900 dark">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Ticker Input */}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter ticker symbol (e.g., AAPL)"
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-slate-400">Loading prediction data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <p className="text-red-400">Error: {error.message}</p>
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && data && (
          <>
            {/* Top Section: Main Prediction Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <PredictionCard 
                  ticker={data.ticker}
                  currentPrice={data.current_price}
                  predictedPrice={data.predicted_price}
                  predictionChange={data.prediction_change}
                  confidence={data.confidence}
                  lastUpdated={data.last_updated}
                />
              </div>
              
              {/* Right side can be used for additional metrics or kept empty for clean design */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="text-center space-y-4 text-slate-500">
                  <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto flex items-center justify-center border border-slate-700">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-sm">Additional analytics coming soon</p>
                </div>
              </div>
            </div>
            
            {/* Bottom Section: Chart and Table */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Price Chart - Takes 2/3 of the width */}
              <div className="xl:col-span-2">
                <PriceChart 
                  historicalData={data.historical_data}
                  forecastData={data.forecast_data}
                  ticker={data.ticker}
                />
              </div>
              
              {/* Forecast Table - Takes 1/3 of the width */}
              <div className="xl:col-span-1">
                <ForecastTable forecastData={data.forecast_data} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}