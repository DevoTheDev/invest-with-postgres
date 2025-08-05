import { SymbolSearchMatch, SymbolSearchResponse } from '@/app/defaults/alphaVantage-defaults/defaultSymbolSearch';
import React from 'react';

interface SymbolSearchProps {
  data: SymbolSearchResponse;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Symbol Search Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Symbol</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Region</th>
              <th scope="col" className="px-4 py-3">Market Hours</th>
              <th scope="col" className="px-4 py-3">Timezone</th>
              <th scope="col" className="px-4 py-3">Currency</th>
              <th scope="col" className="px-4 py-3">Match Score</th>
            </tr>
          </thead>
          <tbody>
            {data.bestMatches.map((match: SymbolSearchMatch) => (
              <tr key={match['1. symbol']} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{match['1. symbol']}</td>
                <td className="px-4 py-2">{match['2. name']}</td>
                <td className="px-4 py-2">{match['3. type']}</td>
                <td className="px-4 py-2">{match['4. region']}</td>
                <td className="px-4 py-2">{`${match['5. marketOpen']} - ${match['6. marketClose']}`}</td>
                <td className="px-4 py-2">{match['7. timezone']}</td>
                <td className="px-4 py-2">{match['8. currency']}</td>
                <td className="px-4 py-2">{parseFloat(match['9. matchScore']).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SymbolSearch;