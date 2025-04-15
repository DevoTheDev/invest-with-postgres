/*

Get Historical Options
Route: /historical-options

Method: GET

Query Parameters:

symbol (required): The stock symbol (e.g., AAPL).

date (optional): A specific date (e.g., 2025-01-01).

datatype (optional): The response format (e.g., json, csv).

Example URL: {{ericInvestUrl}}/api/alpha-vantage/historical-options?symbol=AAPL&date=2025-01-01&datatype=json

*/

export const defaultHistoricalOptions = 