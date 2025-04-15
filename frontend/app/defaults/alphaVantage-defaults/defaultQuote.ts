/*

Get Quote Data
Route: /quote

Method: GET

Query Parameters:

symbol (required): The stock symbol (e.g., AAPL).

datatype (optional): The response format (e.g., json, csv).

Example URL: {{ericInvestUrl}}/api/alpha-vantage/quote?symbol=AAPL&datatype=json

*/

export const defaultQuote = {
    "Global Quote": {
        "01. symbol": "AAPL",
        "02. open": "193.8900",
        "03. high": "199.8800",
        "04. low": "187.3400",
        "05. price": "188.3800",
        "06. volume": "125910913",
        "07. latest trading day": "2025-04-04",
        "08. previous close": "203.1900",
        "09. change": "-14.8100",
        "10. change percent": "-7.2887%"
    }
}