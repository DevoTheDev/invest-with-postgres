export interface IntradayMetaData {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string; // Format: YYYY-MM-DD HH:mm:ss
    '4. Interval': '1min' | '5min' | '15min' | '30min' | '60min';
    '5. Output Size': 'Compact' | 'Full size';
    '6. Time Zone': string; // e.g., "US/Eastern"
}

export interface IntradayOHLCV {
    '1. open': string;   // Open price as string
    '2. high': string;   // High price as string
    '3. low': string;    // Low price as string
    '4. close': string;  // Close price as string
    '5. volume': string; // Volume as string
}

export interface IntradayTimeSeries {
    [timestamp: string]: IntradayOHLCV; // e.g., "2025-08-04 19:55:00"
}






export interface DailyMetaData {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string; // Format: YYYY-MM-DD
    '4. Output Size': 'Compact' | 'Full size';
    '5. Time Zone': string; // e.g., "US/Eastern"
}

export interface DailyOHLCV {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
}

export interface DailyTimeSeries {
    [date: string]: DailyOHLCV; // e.g., "2025-08-04"
}

export interface DailyTimeSeriesResponse {
    'Meta Data': DailyMetaData;
    'Time Series (Daily)': DailyTimeSeries;
}





export interface WeeklyMetaData {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string; // Format: YYYY-MM-DD
    '4. Time Zone': string;      // e.g., "US/Eastern"
}

export interface WeeklyOHLCV {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
}

export interface WeeklyTimeSeries {
    [date: string]: WeeklyOHLCV; // Format: YYYY-MM-DD
}

export interface WeeklyTimeSeriesResponse {
    'Meta Data': WeeklyMetaData;
    'Weekly Time Series': WeeklyTimeSeries;
}







export interface MonthlyMetaData {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string; // Format: YYYY-MM-DD
    '4. Time Zone': string;      // e.g., "US/Eastern"
}

export interface MonthlyOHLCV {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
}

export interface MonthlyTimeSeries {
    [date: string]: MonthlyOHLCV; // Format: YYYY-MM-DD
}

export interface MonthlyTimeSeriesResponse {
    'Meta Data': MonthlyMetaData;
    'Monthly Time Series': MonthlyTimeSeries;
}


