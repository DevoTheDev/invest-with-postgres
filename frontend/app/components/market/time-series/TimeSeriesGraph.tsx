import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyTimeSeriesResponse } from './types';
import { defaultDailyResponse } from '@/app/defaults/alphaVantage-defaults/defaultDailyDataWithSymbol';
interface TimeSeriesGraphProps {
  data?: DailyTimeSeriesResponse;
}

interface ChartDataPoint {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({ data = defaultDailyResponse }) => {
  const chartData = useMemo<ChartDataPoint[]>(() => {
    const timeSeries = data['Time Series (Daily)'];
    return Object.entries(timeSeries)
      .map(([date, values]) => ({
        date,
        close: parseFloat(values['4. close']),
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        volume: parseInt(values['5. volume']),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">
        {data['Meta Data']['2. Symbol']} Daily Closing Prices
      </h2>
      <div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'volume') return [value.toLocaleString(), 'Volume'];
                return [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              activeDot={{ r: 2 }}
              name="close"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesGraph;