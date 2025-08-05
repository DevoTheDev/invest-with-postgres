export interface GlobalQuote {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string; // Format: YYYY-MM-DD
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;     // e.g., "-7.2887%"
  }
  
  export interface StockQuoteResponse {
    "Global Quote": GlobalQuote;
  }
  

export const defaultStockQuote: StockQuoteResponse = {
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