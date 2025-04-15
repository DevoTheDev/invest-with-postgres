export type TickerData = {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  };
  
  export type TopGainersAndLosers = {
    metadata: string;
    last_updated: string;
    top_gainers: TickerData[];
    top_losers: TickerData[];
    most_actively_traded: TickerData[];
  };