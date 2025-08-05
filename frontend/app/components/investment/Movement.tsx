import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Stock } from '@/app/types/Investor';

interface MovementProps {
  movement: Stock['movement'];
  mini?: boolean;
}

const Movement: React.FC<MovementProps> = ({ movement, mini }) => {
  // Transform movement object into array for Recharts
  const data = movement
    ? Object.entries(movement).map(([key, value]) => ({
        timeframe: key.charAt(0).toUpperCase() + key.slice(1),
        value:
          typeof value === 'string'
            ? parseFloat(value)
            : typeof value === 'number'
            ? value
            : 0,
      }))
    : [];

  // Determine if the overall trend is negative
  const trendIsNegative =
    data.length >= 2 && data[data.length - 1].value < data[0].value;

  // Use red if trend is negative, green otherwise
  const strokeColor = trendIsNegative ? '#dc2626' : '#16a34a';

  const Mini = () => (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          dot={{ r: 2, fill: strokeColor }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const Full = () => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="timeframe"
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          unit="%"
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            color: '#1f2937',
          }}
          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Change']}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          dot={{ r: 4, fill: strokeColor }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full">
      {!mini && <p className="text-sm text-gray-500 mb-2">Movement Trend</p>}
      {mini ? Mini() : Full()}
    </div>
  );
};

export default Movement;
