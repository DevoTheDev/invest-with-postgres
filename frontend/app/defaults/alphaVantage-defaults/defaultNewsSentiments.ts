/*

Get News Sentiment
Route: /news-sentiment

Method: GET

Query Parameters:

tickers (optional): Comma-separated list of ticker symbols (e.g., AAPL,GOOG).

topics (optional): Comma-separated list of topics (e.g., tech,finance).

timeFrom (optional): Start date for news (e.g., 2025-01-01).

timeTo (optional): End date for news (e.g., 2025-02-01).

sort (optional): Sorting method (LATEST or RELEVANT).

limit (optional): Limit the number of results (default is 50).

Example URL: {{ericInvestUrl}}/api/alpha-vantage/news-sentiment?tickers=AAPL,GOOG&topics=tech,finance&timeFrom=2025-01-01&timeTo=2025-02-01&sort=LATEST&limit=10

*/

export const defaultNewsSentiments = {}