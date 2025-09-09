import { TrendingUp, Award } from 'lucide-react';
import { Card } from './ui/card';

export function PredictionCard() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-8">
      <div className="text-center space-y-6">
        {/* Ticker Symbol */}
        <div>
          <h2 className="text-3xl text-white mb-2">AAPL</h2>
          <p className="text-slate-400">Apple Inc.</p>
        </div>

        {/* Main Prediction */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <p className="text-slate-400 text-sm">Prediction</p>
              <p className="text-2xl text-green-400">UP</p>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <Award className="w-5 h-5" />
            <span className="text-lg">Confidence: High</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-slate-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Current Price</p>
              <p className="text-white">$228.87</p>
            </div>
            <div>
              <p className="text-slate-400">Target Price</p>
              <p className="text-green-400">$235.20</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}