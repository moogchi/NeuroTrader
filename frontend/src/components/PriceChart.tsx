import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';

// Mock data for the last 30 days + next 7 days
const generateChartData = () => {
  const data = [];
  const startDate = new Date('2025-08-10');
  const currentDate = new Date('2025-09-09');
  
  // Historical data (last 30 days)
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const basePrice = 225 + Math.sin(i * 0.3) * 15 + Math.random() * 8 - 4;
    
    data.push({
      date: date.toISOString().split('T')[0],
      historical: Math.round(basePrice * 100) / 100,
      predicted: null,
      isHistorical: true
    });
  }
  
  // Predicted data (next 7 days)
  const lastHistoricalPrice = data[data.length - 1].historical;
  for (let i = 1; i <= 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    const trendMultiplier = 1 + (i * 0.003); // Upward trend
    const predictedPrice = lastHistoricalPrice * trendMultiplier + Math.random() * 3 - 1.5;
    
    data.push({
      date: date.toISOString().split('T')[0],
      historical: null,
      predicted: Math.round(predictedPrice * 100) / 100,
      isHistorical: false
    });
  }
  
  return data;
};

const chartData = generateChartData();

export function PriceChart() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="mb-4">
        <h3 className="text-lg text-white mb-2">30-Day Price Chart</h3>
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
                `$${value?.toFixed(2)}`, 
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