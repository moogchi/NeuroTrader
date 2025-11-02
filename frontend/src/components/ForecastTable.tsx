import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface ForecastDataPoint {
  date: string;
  price: number;
  confidence: number;
}

interface ForecastTableProps {
  forecastData: ForecastDataPoint[];
}

export function ForecastTable({ forecastData }: ForecastTableProps) {
  // Calculate direction based on price trend
  const getDirection = (index: number) => {
    if (index === 0) return 'neutral';
    const currentPrice = forecastData[index].price;
    const previousPrice = forecastData[index - 1].price;
    return currentPrice > previousPrice ? 'up' : currentPrice < previousPrice ? 'down' : 'neutral';
  };

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
            <TableHead className="text-slate-300">Price</TableHead>
            <TableHead className="text-slate-300">Confidence</TableHead>
            <TableHead className="text-slate-300 text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecastData.map((forecast, index) => {
            const direction = getDirection(index);
            const formattedDate = new Date(forecast.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });

            return (
              <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell className="text-slate-200">
                  {formattedDate}
                </TableCell>
                <TableCell className="text-slate-200">
                  ${forecast.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-slate-200">
                  {(forecast.confidence * 100).toFixed(0)}%
                </TableCell>
                <TableCell className="text-right">
                  {direction === 'up' ? (
                    <div className="flex items-center justify-end gap-1 text-green-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  ) : direction === 'down' ? (
                    <div className="flex items-center justify-end gap-1 text-red-400">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <Minus className="w-4 h-4" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}