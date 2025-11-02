import { TrendingUp, TrendingDown, Award } from 'lucide-react';
import { Card } from './ui/card';

interface PredictionCardProps {
  ticker: string;
  currentPrice: number;
  predictedPrice: number;
  predictionChange: number;
  confidence: number;
  lastUpdated: string;
}

export function PredictionCard({
  ticker,
  currentPrice,
  predictedPrice,
  predictionChange,
  confidence,
  lastUpdated,
}: PredictionCardProps) {
  const isPositive = predictionChange > 0;
  const confidenceLevel = confidence >= 85 ? 'High' : confidence >= 70 ? 'Medium' : 'Low';
  
  return (
    <Card className="bg-slate-800 border-slate-700 p-8">
      <div className="text-center space-y-6">
        {/* Ticker Symbol */}
        <div>
          <h2 className="text-3xl text-white mb-2">{ticker}</h2>
          <p className="text-slate-400 text-xs">
            Updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        </div>

        {/* Main Prediction */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className={`w-16 h-16 ${isPositive ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center`}>
              {isPositive ? (
                <TrendingUp className="w-8 h-8 text-white" />
              ) : (
                <TrendingDown className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="text-left">
              <p className="text-slate-400 text-sm">Prediction</p>
              <p className={`text-2xl ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? 'UP' : 'DOWN'} {Math.abs(predictionChange).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <Award className="w-5 h-5" />
            <span className="text-lg">Confidence: {confidenceLevel} ({confidence.toFixed(1)}%)</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-slate-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Current Price</p>
              <p className="text-white">${currentPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400">Target Price</p>
              <p className={isPositive ? 'text-green-400' : 'text-red-400'}>
                ${predictedPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}