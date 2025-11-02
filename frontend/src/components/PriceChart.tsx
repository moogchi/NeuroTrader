import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';

interface HistoricalDataPoint {
  date: string;
  price: number;
}

interface ForecastDataPoint {
  date: string;
  price: number;
  confidence: number;
}

interface PriceChartProps {
  historicalData: HistoricalDataPoint[];
  forecastData: ForecastDataPoint[];
  ticker: string;
}

export function PriceChart({ historicalData, forecastData, ticker }: PriceChartProps) {
  // Combine historical and forecast data for the chart
  const chartData = [
    ...historicalData.map(point => ({
      date: point.date,
      historical: point.price,
      predicted: null,
    })),
    ...forecastData.map(point => ({
      date: point.date,
      historical: null,
      predicted: point.price,
    })),
  ];

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="mb-4">
        <h3 className="text-lg text-white mb-2">{ticker} Price Chart</h3>
        <p className="text-slate-400 text-sm">Historical data (blue) and 7-day prediction (red dashed)</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value, name) => [
                `$${typeof value === 'number' ? value.toFixed(2) : value}`, 
                name === 'historical' ? 'Historical' : 'Predicted'
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend 
              wrapperStyle={{ color: '#9CA3AF' }}
            />
            <Line 
              type="monotone" 
              dataKey="historical" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              name="Historical Price"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#EF4444" 
              strokeWidth={2}
              strokeDasharray="8 8"
              dot={false}
              name="Predicted Price"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}