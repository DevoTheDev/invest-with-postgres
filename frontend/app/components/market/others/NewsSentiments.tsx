import React from 'react';
import { NewsFeedItem, NewsSentimentsResponse, SentimentLabel } from '@/app/defaults/alphaVantage-defaults/defaultNewsSentiments';

interface NewsSentimentsProps {
  data: NewsSentimentsResponse;
}

const formatSentimentScore = (score: number) => {
  return score.toFixed(4);
};

const formatSentimentLabel = (label: SentimentLabel) => {
  return label.replace('-', ' '); // Convert "Somewhat-Bearish" to "Somewhat Bearish"
};

const formatDate = (date: string) => {
  // Convert "20250805T080000" to a readable format
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(9, 11);
  const minute = date.slice(11, 13);
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`).toLocaleString();
};

const NewsSentiments: React.FC<NewsSentimentsProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">News Sentiments</h2>
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Items:</span> {data.items}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Sentiment Score Definition:</span> {data.sentiment_score_definition}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Relevance Score Definition:</span> {data.relevance_score_definition}
        </p>
      </div>
      <div className="space-y-6">
        {data.feed.map((item: NewsFeedItem, index: number) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {item.title}
              </a>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{formatDate(item.time_published)}</p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Source:</span> {item.source} ({item.source_domain})
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Authors:</span> {item.authors.join(', ') || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Category:</span> {item.category_within_source || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mt-2">{item.summary}</p>
            {item.banner_image && (
              <img src={item.banner_image} alt="Banner" className="mt-2 max-w-full h-auto rounded" />
            )}
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Overall Sentiment:</span>{' '}
                {formatSentimentLabel(item.overall_sentiment_label)} ({formatSentimentScore(item.overall_sentiment_score)})
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Topics:</span>{' '}
                {item.topics.map((topic) => `${topic.topic} (${topic.relevance_score})`).join(', ')}
              </p>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">Ticker Sentiment</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 mt-2">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2">Ticker</th>
                      <th scope="col" className="px-4 py-2">Relevance Score</th>
                      <th scope="col" className="px-4 py-2">Sentiment Score</th>
                      <th scope="col" className="px-4 py-2">Sentiment Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.ticker_sentiment.map((ticker) => (
                      <tr key={ticker.ticker} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{ticker.ticker}</td>
                        <td className="px-4 py-2">{ticker.relevance_score}</td>
                        <td className="px-4 py-2">{ticker.ticker_sentiment_score}</td>
                        <td className="px-4 py-2">{formatSentimentLabel(ticker.ticker_sentiment_label)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSentiments;