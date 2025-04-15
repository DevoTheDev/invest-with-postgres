/*

Get Analytics Fixed Window
Route: /analytics-fixed-window

Method: GET

Query Parameters:

symbols (required): A comma-separated list of stock symbols (e.g., AAPL,GOOG).

range (required): Time range (e.g., 1d, 1w, 1m).

interval (required): Interval for analysis (e.g., 1min, 5min, daily).

calculations (required): Specific calculations to retrieve (e.g., sma,ema).

Example URL: {{ericInvestUrl}}/api/alpha-vantage/analytics-fixed-window?symbols=AAPL,GOOG&range=1d&interval=1min&calculations=sma,ema

*/

export const defaultAnalyticsFixedWindow = {}