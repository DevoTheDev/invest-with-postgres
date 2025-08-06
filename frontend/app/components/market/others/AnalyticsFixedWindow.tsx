import React from 'react';
import { AnalyticsFixedWindowResponse } from '@/app/defaults/alphaVantage-defaults/defaultAnalyticsFixedWindow'; // Adjust path based on your types file location

interface AnalyticsFixedWindowProps {
  data: AnalyticsFixedWindowResponse;
}

const formatNumber = (value: number | undefined) => {
  return value !== undefined ? value.toFixed(6) : 'N/A';
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const AnalyticsFixedWindow: React.FC<AnalyticsFixedWindowProps> = ({ data }) => {
  const { meta_data, payload } = data;
  const calculations = payload.RETURNS_CALCULATIONS;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Analytics for {meta_data.symbols}</h2>
      <div className="mb-6 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Date Range:</span> {formatDate(meta_data.min_dt)} - {formatDate(meta_data.max_dt)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">OHLC:</span> {meta_data.ohlc}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Interval:</span> {meta_data.interval}
        </p>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Return Calculations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(calculations).map((key) => {
          if (key === 'COVARIANCE' || key === 'CORRELATION') {
            const matrixData = calculations[key as 'COVARIANCE' | 'CORRELATION'];
            return (
              <div key={key} className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 capitalize">{key.toLowerCase()}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2"></th>
                        {matrixData?.index.map((symbol) => (
                          <th key={symbol} scope="col" className="px-4 py-2">{symbol}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrixData?.index.map((symbol, rowIndex) => (
                        <tr key={symbol} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-semibold">{symbol}</td>
                          {/* {matrixData?.[key.toLowerCase() as 'covariance' | 'correlation'][rowIndex].map((value: number, colIndex: number) => (
                            <td key={colIndex} className="px-4 py-2">{formatNumber(value)}</td>
                          ))} */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          } else if (key !== 'HISTOGRAM') {
            const values = calculations[key as keyof typeof calculations] as Record<string, number> | undefined;
            return (
              <div key={key} className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 capitalize">{key.toLowerCase()}</h4>
                <ul className="text-sm text-gray-600">
                  {values && Object.entries(values).map(([symbol, value]) => (
                    <li key={symbol} className="py-1">{symbol}: {formatNumber(value)}</li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default AnalyticsFixedWindow;