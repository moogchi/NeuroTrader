import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

// Generate 7-day forecast data
const generateForecastData = () => {
  const basePrice = 228.87;
  const forecasts = [];
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date('2025-09-09');
    date.setDate(date.getDate() + i);
    
    // Simulate price changes with upward trend
    const change = (Math.random() * 6 - 2) + 1; // Slight upward bias
    const predictedPrice = basePrice + (i * 0.8) + change;
    const direction = change > 0 ? 'up' : 'down';
    
    forecasts.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(predictedPrice * 100) / 100,
      direction,
      formattedDate: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    });
  }
  
  return forecasts;
};

const forecastData = generateForecastData();

export function ForecastTable() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="mb-4">
        <h3 className="text-lg text-white mb-2">7-Day Prediction</h3>
        <p className="text-slate-400 text-sm">Detailed daily forecasts for the next week</p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-slate-700/50">
            <TableHead className="text-slate-300">Date</TableHead>
            <TableHead className="text-slate-300">Predicted Close</TableHead>
            <TableHead className="text-slate-300 text-right">Direction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecastData.map((forecast, index) => (
            <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30">
              <TableCell className="text-slate-200">
                {forecast.formattedDate}
              </TableCell>
              <TableCell className="text-slate-200">
                ${forecast.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {forecast.direction === 'up' ? (
                  <div className="flex items-center justify-end gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-1 text-red-400">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}