/*

Get Analytics Fixed Window
Route: /analytics-fixed-window

Method: GET

Query Parameters:

symbols (required): A comma-separated list of stock symbols (e.g., AAPL,GOOG).

range (required): Time range (e.g., 1d, 1w, 1m).

interval (required): Interval for analysis (e.g., 1min, 5min, daily).

calculations (required): Specific calculations to retrieve (e.g., sma,ema).

Example URL: {{ericInvestUrl}}/api/alpha-vantage/analytics?symbols=AAPL,MSFT&range=2023-07-01&range=2023-08-31&interval=DAILY&calculations=MEAN,STDDEV,CORRELATION

*/

export interface AnalyticsFixedWindowResponse {
    meta_data: {
      symbols: string;
      min_dt: string; // e.g., "2023-07-03"
      max_dt: string; // e.g., "2023-08-31"
      ohlc: 'Open' | 'High' | 'Low' | 'Close'; // assuming these are fixed options
      interval: '1min' | '5min' | '15min' | '30min' | '60min' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
    };
    payload: {
      RETURNS_CALCULATIONS: {
        MEAN?: Record<string, number>; // e.g., { "AAPL": -0.00045 }
        STDDEV?: Record<string, number>;
        MAX?: Record<string, number>;
        MIN?: Record<string, number>;
        MEDIAN?: Record<string, number>;
        CUMULATIVE_RETURN?: Record<string, number>;
        VARIANCE?: Record<string, number>;
        MAX_DRAWDOWN?: Record<string, number>;
        HISTOGRAM?: Record<string, unknown>; // placeholder
        AUTOCORRELATION?: Record<string, number>;
        COVARIANCE?: {
          index: string[];
          covariance: number[][];
        };
        CORRELATION?: {
          index: string[];
          correlation: number[][];
        };
      };
    };
  }
  

export const defaultAnalyticsFixedWindow: AnalyticsFixedWindowResponse = {
    "meta_data": {
        "symbols": "MSFT,AAPL",
        "min_dt": "2023-07-03",
        "max_dt": "2023-08-31",
        "ohlc": "Close",
        "interval": "DAILY"
    },
    "payload": {
        "RETURNS_CALCULATIONS": {
            "MEAN": {
                "MSFT": -0.0005772663739571029,
                "AAPL": -0.0004591101507972854
            },
            "STDDEV": {
                "MSFT": 0.014401849168320926,
                "AAPL": 0.012845925557901618
            },
            "CORRELATION": {
                "index": [
                    "MSFT",
                    "AAPL"
                ],
                "correlation": [
                    [
                        1
                    ],
                    [
                        0.3810754257,
                        1
                    ]
                ]
            }
        }
    }
}