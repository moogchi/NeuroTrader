import { Header } from './components/Header';
import { PredictionCard } from './components/PredictionCard';
import { PriceChart } from './components/PriceChart';
import { ForecastTable } from './components/ForecastTable';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 dark">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Top Section: Main Prediction Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PredictionCard />
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
            <PriceChart />
          </div>
          
          {/* Forecast Table - Takes 1/3 of the width */}
          <div className="xl:col-span-1">
            <ForecastTable />
          </div>
        </div>
      </main>
    </div>
  );
}