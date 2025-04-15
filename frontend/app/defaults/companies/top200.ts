import { Stock, Investment, Company } from "@/app/contexts/UserContext";


export const topCompanies: Company[] = [
    { 
      name: "Apple Inc.", 
      ticker: "AAPL", 
      marketCap: 3560, 
      sector: "Technology"
     },
  { 
  
    name: "NVIDIA Corporation", 
    ticker: "NVDA", 
    marketCap: 3230, 
    sector: "Technology"
   },
  { 
  
    name: "Microsoft Corporation", 
    ticker: "MSFT", 
    marketCap: 3110, 
    sector: "Technology"
   },
  { 
  
    name: "Alphabet Inc.", 
    ticker: "GOOGL", 
    marketCap: 2050, 
    sector: "Technology"
   },
  { 
  
    name: "Amazon.com Inc.", 
    ticker: "AMZN", 
    marketCap: 1970, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Saudi Arabian Oil Company (Saudi Aramco)", 
    ticker: "2222.SR", 
    marketCap: 1750, 
    sector: "Energy"
   },
  { 
  
    name: "Meta Platforms, Inc.", 
    ticker: "META", 
    marketCap: 1480, 
    sector: "Technology"
   },
  { 
  
    name: "Berkshire Hathaway Inc.", 
    ticker: "BRK.A", 
    marketCap: 994, 
    sector: "Financial"
   },
  { 
  
    name: "Eli Lilly and Company", 
    ticker: "LLY", 
    marketCap: 822, 
    sector: "Healthcare"
   },
  { 
  
    name: "Taiwan Semiconductor Manufacturing Company (TSMC)", 
    ticker: "TSM", 
    marketCap: 970, 
    sector: "Technology"
   },
  { 
  
    name: "Tesla Inc.", 
    ticker: "TSLA", 
    marketCap: 900, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "UnitedHealth Group Incorporated", 
    ticker: "UNH", 
    marketCap: 500, 
    sector: "Healthcare"
   },
  { 
  
    name: "Johnson & Johnson", 
    ticker: "JNJ", 
    marketCap: 450, 
    sector: "Healthcare"
   },
  { 
  
    name: "Visa Inc.", 
    ticker: "V", 
    marketCap: 480, 
    sector: "Financial Services"
   },
  { 
  
    name: "Exxon Mobil Corporation", 
    ticker: "XOM", 
    marketCap: 460, 
    sector: "Energy"
   },
  { 
  
    name: "Samsung Electronics Co., Ltd.", 
    ticker: "005930.KS", 
    marketCap: 450, 
    sector: "Technology"
   },
  { 
  
    name: "JPMorgan Chase & Co.", 
    ticker: "JPM", 
    marketCap: 430, 
    sector: "Financial"
   },
  { 
  
    name: "Walmart Inc.", 
    ticker: "WMT", 
    marketCap: 410, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Procter & Gamble Company", 
    ticker: "PG", 
    marketCap: 400, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Nestlé S.A.", 
    ticker: "NESN.SW", 
    marketCap: 390, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Roche Holding AG", 
    ticker: "ROG.SW", 
    marketCap: 380, 
    sector: "Healthcare"
   },
  { 
  
    name: "Toyota Motor Corporation", 
    ticker: "7203.T", 
    marketCap: 370, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Novo Nordisk A/S", 
    ticker: "NOVO.B", 
    marketCap: 360, 
    sector: "Healthcare"
   },
  { 
  
    name: "Pfizer Inc.", 
    ticker: "PFE", 
    marketCap: 350, 
    sector: "Healthcare"
   },
  { 
  
    name: "Alibaba Group Holding Limited", 
    ticker: "BABA", 
    marketCap: 340, 
    sector: "Technology"
   },
  { 
  
    name: "LVMH Moët Hennessy Louis Vuitton", 
    ticker: "MC.PA", 
    marketCap: 330, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Samsung Biologics Co., Ltd.", 
    ticker: "207940.KQ", 
    marketCap: 320, 
    sector: "Healthcare"
   },
  { 
  
    name: "ASML Holding N.V.", 
    ticker: "ASML", 
    marketCap: 310, 
    sector: "Technology"
   },
  { 
  
    name: "Cisco Systems, Inc.", 
    ticker: "CSCO", 
    marketCap: 300, 
    sector: "Technology"
   },
  { 
  
    name: "Oracle Corporation", 
    ticker: "ORCL", 
    marketCap: 290, 
    sector: "Technology"
   },
  { 
  
    name: "Coca-Cola Company", 
    ticker: "KO", 
    marketCap: 280, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "PepsiCo, Inc.", 
    ticker: "PEP", 
    marketCap: 270, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Bank of America Corporation", 
    ticker: "BAC", 
    marketCap: 260, 
    sector: "Financial"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 250, 
    sector: "Healthcare"
   },
  { 
  
    name: "Intel Corporation", 
    ticker: "INTC", 
    marketCap: 240, 
    sector: "Technology"
   },
  { 
  
    name: "Chevron Corporation", 
    ticker: "CVX", 
    marketCap: 230, 
    sector: "Energy"
   },
  { 
  
    name: "Salesforce.com Inc.", 
    ticker: "CRM", 
    marketCap: 220, 
    sector: "Technology"
   },
  { 
  
    name: "Adobe Inc.", 
    ticker: "ADBE", 
    marketCap: 210, 
    sector: "Technology"
   },
  { 
  
    name: "Netflix, Inc.", 
    ticker: "NFLX", 
    marketCap: 200, 
    sector: "Technology"
   },
  { 
  
    name: "McDonald's Corporation", 
    ticker: "MCD", 
    marketCap: 190, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Comcast Corporation", 
    ticker: "CMCSA", 
    marketCap: 180, 
    sector: "Communication Services"
   },
  { 
  
    name: "Verizon Communications Inc.", 
    ticker: "VZ", 
    marketCap: 170, 
    sector: "Communication Services"
   },
  { 
  
    name: "AT&T Inc.", 
    ticker: "T", 
    marketCap: 160, 
    sector: "Communication Services"
   },
  { 
  
    name: "Boeing Company", 
    ticker: "BA", 
    marketCap: 150, 
    sector: "Industrials"
   },
  { 
  
    name: "Intel Corporation", 
    ticker: "INTC", 
    marketCap: 140, 
    sector: "Technology"
   },
  { 
  
    name: "TotalEnergies SE", 
    ticker: "TTE", 
    marketCap: 130, 
    sector: "Energy"
   },
  { 
  
    name: "SAP SE", 
    ticker: "SAP", 
    marketCap: 120, 
    sector: "Technology"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 110, 
    sector: "Healthcare"
   },
  { 
  
    name: "Shell plc", 
    ticker: "SHEL", 
    marketCap: 100, 
    sector: "Energy"
   },
  { 
  
    name: "Toyota Motor Corporation", 
    ticker: "TM", 
    marketCap: 95, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Nestlé S.A.", 
    ticker: "NESN.SW", 
    marketCap: 90, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Pfizer Inc.", 
    ticker: "PFE", 
    marketCap: 85, 
    sector: "Healthcare"
   },
  { 
  
    name: "Alibaba Group Holding Limited", 
    ticker: "BABA", 
    marketCap: 80, 
    sector: "Technology"
   },
  { 
  
    name: "LVMH Moët Hennessy Louis Vuitton", 
    ticker: "MC.PA", 
    marketCap: 75, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Samsung Electronics Co., Ltd.", 
    ticker: "005930.KS", 
    marketCap: 70, 
    sector: "Technology"
   },
  { 
  
    name: "Cisco Systems, Inc.", 
    ticker: "CSCO", 
    marketCap: 65, 
    sector: "Technology"
   },
  { 
  
    name: "Oracle Corporation", 
    ticker: "ORCL", 
    marketCap: 60, 
    sector: "Technology"
   },
  { 
  
    name: "Coca-Cola Company", 
    ticker: "KO", 
    marketCap: 55, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "PepsiCo, Inc.", 
    ticker: "PEP", 
    marketCap: 50, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Bank of America Corporation", 
    ticker: "BAC", 
    marketCap: 45, 
    sector: "Financial"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 40, 
    sector: "Healthcare"
   },
  { 
  
    name: "Intel Corporation", 
    ticker: "INTC", 
    marketCap: 35, 
    sector: "Technology"
   },
  { 
  
    name: "Chevron Corporation", 
    ticker: "CVX", 
    marketCap: 30, 
    sector: "Energy"
   },
  { 
  
    name: "Salesforce.com Inc.", 
    ticker: "CRM", 
    marketCap: 25, 
    sector: "Technology"
   },
  { 
  
    name: "Adobe Inc.", 
    ticker: "ADBE", 
    marketCap: 20, 
    sector: "Technology"
   },
  { 
  
    name: "Netflix, Inc.", 
    ticker: "NFLX", 
    marketCap: 15, 
    sector: "Technology"
   },
  { 
  
    name: "McDonald's Corporation", 
    ticker: "MCD", 
    marketCap: 10, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Comcast Corporation", 
    ticker: "CMCSA", 
    marketCap: 9, 
    sector: "Communication Services"
   },
  { 
  
    name: "Verizon Communications Inc.", 
    ticker: "VZ", 
    marketCap: 8, 
    sector: "Communication Services"
   },
  { 
  
    name: "AT&T Inc.", 
    ticker: "T", 
    marketCap: 7, 
    sector: "Communication Services"
   },
  { 
  
    name: "Boeing Company", 
    ticker: "BA", 
    marketCap: 6, 
    sector: "Industrials"
   },
  { 
  
    name: "Intel Corporation", 
    ticker: "INTC", 
    marketCap: 5, 
    sector: "Technology"
   },
  { 
  
    name: "TotalEnergies SE", 
    ticker: "TTE", 
    marketCap: 4, 
    sector: "Energy"
   },
  { 
  
    name: "SAP SE", 
    ticker: "SAP", 
    marketCap: 3, 
    sector: "Technology"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 2, 
    sector: "Healthcare"
   },
  { 
  
    name: "Shell plc", 
    ticker: "SHEL", 
    marketCap: 1, 
    sector: "Energy"
   },
  { 
  
    name: "Toyota Motor Corporation", 
    ticker: "TM", 
    marketCap: 0.9, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Nestlé S.A.", 
    ticker: "NESN.SW", 
    marketCap: 0.8, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Pfizer Inc.", 
    ticker: "PFE", 
    marketCap: 0.7, 
    sector: "Healthcare"
   },
  { 
  
    name: "Alibaba Group Holding Limited", 
    ticker: "BABA", 
    marketCap: 0.6, 
    sector: "Technology"
   },
  { 
  
    name: "LVMH Moët Hennessy Louis Vuitton", 
    ticker: "MC.PA", 
    marketCap: 0.5, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Samsung Electronics Co., Ltd.", 
    ticker: "005930.KS", 
    marketCap: 0.4, 
    sector: "Technology"
   },
  { 
  
    name: "Cisco Systems, Inc.", 
    ticker: "CSCO", 
    marketCap: 0.3, 
    sector: "Technology"
   },
  { 
  
    name: "Oracle Corporation", 
    ticker: "ORCL", 
    marketCap: 0.2, 
    sector: "Technology"
   },
  { 
  
    name: "Coca-Cola Company", 
    ticker: "KO", 
    marketCap: 240, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "PepsiCo, Inc.", 
    ticker: "PEP", 
    marketCap: 230, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Bank of America Corporation", 
    ticker: "BAC", 
    marketCap: 220, 
    sector: "Financial"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 210, 
    sector: "Healthcare"
   },
  { 
  
    name: "Intel Corporation", 
    ticker: "INTC", 
    marketCap: 200, 
    sector: "Technology"
   },
  { 
  
    name: "Chevron Corporation", 
    ticker: "CVX", 
    marketCap: 190, 
    sector: "Energy"
   },
  { 
  
    name: "Salesforce.com Inc.", 
    ticker: "CRM", 
    marketCap: 180, 
    sector: "Technology"
   },
  { 
  
    name: "Adobe Inc.", 
    ticker: "ADBE", 
    marketCap: 170, 
    sector: "Technology"
   },
  { 
  
    name: "Netflix, Inc.", 
    ticker: "NFLX", 
    marketCap: 160, 
    sector: "Technology"
   },
  { 
  
    name: "McDonald's Corporation", 
    ticker: "MCD", 
    marketCap: 150, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Comcast Corporation", 
    ticker: "CMCSA", 
    marketCap: 140, 
    sector: "Communication Services"
   },
  { 
  
    name: "Verizon Communications Inc.", 
    ticker: "VZ", 
    marketCap: 130, 
    sector: "Communication Services"
   },
  { 
  
    name: "AT&T Inc.", 
    ticker: "T", 
    marketCap: 120, 
    sector: "Communication Services"
   },
  { 
  
    name: "Boeing Company", 
    ticker: "BA", 
    marketCap: 110, 
    sector: "Industrials"
   },
  { 
  
    name: "TotalEnergies SE", 
    ticker: "TTE", 
    marketCap: 100, 
    sector: "Energy"
   },
  { 
  
    name: "SAP SE", 
    ticker: "SAP", 
    marketCap: 95, 
    sector: "Technology"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 90, 
    sector: "Healthcare"
   },
  { 
  
    name: "Shell plc", 
    ticker: "SHEL", 
    marketCap: 85, 
    sector: "Energy"
   },
  { 
  
    name: "Toyota Motor Corporation", 
    ticker: "TM", 
    marketCap: 80, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Nestlé S.A.", 
    ticker: "NESN.SW", 
    marketCap: 75, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Pfizer Inc.", 
    ticker: "PFE", 
    marketCap: 70, 
    sector: "Healthcare"
   },
  { 
  
    name: "Alibaba Group Holding Limited", 
    ticker: "BABA", 
    marketCap: 65, 
    sector: "Technology"
   },
  { 
  
    name: "LVMH Moët Hennessy Louis Vuitton", 
    ticker: "MC.PA", 
    marketCap: 60, 
    sector: "Consumer Cyclicals"
   },
  { 
  
    name: "Samsung Electronics Co., Ltd.", 
    ticker: "005930.KS", 
    marketCap: 55, 
    sector: "Technology"
   },
  { 
  
    name: "Cisco Systems, Inc.", 
    ticker: "CSCO", 
    marketCap: 50, 
    sector: "Technology"
   },
  { 
  
    name: "Oracle Corporation", 
    ticker: "ORCL", 
    marketCap: 45, 
    sector: "Technology"
   },
  { 
  
    name: "Coca-Cola Company", 
    ticker: "KO", 
    marketCap: 40, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "PepsiCo, Inc.", 
    ticker: "PEP", 
    marketCap: 35, 
    sector: "Consumer Staples"
   },
  { 
  
    name: "Bank of America Corporation", 
    ticker: "BAC", 
    marketCap: 30, 
    sector: "Financial"
   },
  { 
  
    name: "AbbVie Inc.", 
    ticker: "ABBV", 
    marketCap: 25, 
    sector: "Healthcare"
   },
  { 
  
    name: "Intel Corporation", 
    ticker: "INTC", 
    marketCap: 20, 
    sector: "Technology"
   },
  { 
  
    name: "Chevron Corporation", 
    ticker: "CVX", 
    marketCap: 15, 
    sector: "Energy"
   },
  { 
  
    name: "Salesforce.com Inc.", 
    ticker: "CRM", 
    marketCap: 10, 
    sector: "Technology"
   },
  { 
  
    name: "Salesforce, Inc.", 
    ticker: "CRM", 
    marketCap: 234.69, 
    sector: "Technology Services"
   },
  { 
  
    name: "Abbott Laboratories", 
    ticker: "ABT", 
    marketCap: 216.55, 
    sector: "Health Technology"
   },
  { 
  
    name: "AstraZeneca PLC", 
    ticker: "AZN", 
    marketCap: 216.04, 
    sector: "Health Technology"
   },
  { 
  
    name: "McDonald's Corporation", 
    ticker: "MCD", 
    marketCap: 214.26, 
    sector: "Consumer Services"
   },
  { 
  
    name: "IBM", 
    ticker: "IBM", 
    marketCap: 209.36, 
    sector: "Technology Services"
   },
  { 
  
    name: "Merck & Co., Inc.", 
    ticker: "MRK", 
    marketCap: 205.06, 
    sector: "Health Technology"
   },
  { 
  
    name: "L'Oréal", 
    ticker: "OR", 
    marketCap: 203.59, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "Novartis", 
    ticker: "NVS", 
    marketCap: 203.35, 
    sector: "Health Technology"
   },
  { 
  
    name: "Wells Fargo & Company", 
    ticker: "WFC", 
    marketCap: 202.99, 
    sector: "Finance"
   },
  { 
  
    name: "Linde plc", 
    ticker: "LIN", 
    marketCap: 201.39, 
    sector: "Process Industries"
   },
  { 
  
    name: "PetroChina Co.", 
    ticker: "PTR", 
    marketCap: 197.51, 
    sector: "Energy Minerals"
   },
  { 
  
    name: "PepsiCo, Inc.", 
    ticker: "PEP", 
    marketCap: 196.36, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "AT&T Inc.", 
    ticker: "T", 
    marketCap: 192.59, 
    sector: "Communications"
   },
  { 
  
    name: "Shell plc", 
    ticker: "SHEL", 
    marketCap: 191.22, 
    sector: "Energy Minerals"
   },
  { 
  
    name: "Reliance Industries Ltd", 
    ticker: "RELIANCE", 
    marketCap: 190.53, 
    sector: "Energy Minerals"
   },
  { 
  
    name: "HDFC Bank Ltd", 
    ticker: "HDFCBANK", 
    marketCap: 187.23, 
    sector: "Finance"
   },
  { 
  
    name: "Palantir Technologies Inc.", 
    ticker: "PLTR", 
    marketCap: 182.56, 
    sector: "Technology Services"
   },
  { 
  
    name: "GE Aerospace", 
    ticker: "GE", 
    marketCap: 179.99, 
    sector: "Electronic Technology"
   },
  { 
  
    name: "Verizon Communications Inc.", 
    ticker: "VZ", 
    marketCap: 179.25, 
    sector: "Communications"
   },
  { 
  
    name: "Accenture plc", 
    ticker: "ACN", 
    marketCap: 178.24, 
    sector: "Technology Services"
   },
  { 
  
    name: "Deutsche Telekom AG", 
    ticker: "DTE", 
    marketCap: 177.6, 
    sector: "Communications"
   },
  { 
  
    name: "HSBC Holdings plc", 
    ticker: "HSBA", 
    marketCap: 173.48, 
    sector: "Finance"
   },
  { 
  
    name: "Intuitive Surgical, Inc.", 
    ticker: "ISRG", 
    marketCap: 166.1, 
    sector: "Health Technology"
   },
  { 
  
    name: "Thermo Fisher Scientific Inc", 
    ticker: "TMO", 
    marketCap: 165.19, 
    sector: "Health Technology"
   },
  { 
  
    name: "American Express Company", 
    ticker: "AXP", 
    marketCap: 164.26, 
    sector: "Finance"
   },
  { 
  
    name: "Morgan Stanley", 
    ticker: "MS", 
    marketCap: 162.77, 
    sector: "Finance"
   },
  { 
  
    name: "Siemens AG", 
    ticker: "SIE", 
    marketCap: 159.29, 
    sector: "Producer Manufacturing"
   },
  { 
  
    name: "RTX Corporation", 
    ticker: "RTX", 
    marketCap: 156.63, 
    sector: "Electronic Technology"
   },
  { 
  
    name: "Royal Bank of Canada", 
    ticker: "RY", 
    marketCap: 156.61, 
    sector: "Finance"
   },
  { 
  
    name: "Amgen Inc.", 
    ticker: "AMGN", 
    marketCap: 155.62, 
    sector: "Health Technology"
   },
  { 
  
    name: "Commonwealth Bank of Australia", 
    ticker: "CBA", 
    marketCap: 155.53, 
    sector: "Finance"
   },
  { 
  
    name: "Intuit Inc.", 
    ticker: "INTU", 
    marketCap: 155.5, 
    sector: "Technology Services"
   },
  { 
  
    name: "ServiceNow, Inc.", 
    ticker: "NOW", 
    marketCap: 152.4, 
    sector: "Technology Services"
   },
  { 
  
    name: "Industria de Diseño Textil S.A. (Inditex)", 
    ticker: "ITX", 
    marketCap: 152.24, 
    sector: "Retail Trade"
   },
  { 
  
    name: "Blackstone Inc.", 
    ticker: "BX", 
    marketCap: 151.91, 
    sector: "Finance"
   },
  { 
  
    name: "Unilever PLC", 
    ticker: "ULVR", 
    marketCap: 151.65, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "The Walt Disney Company", 
    ticker: "DIS", 
    marketCap: 150.59, 
    sector: "Consumer Services"
   },
  { 
  
    name: "The Progressive Corporation", 
    ticker: "PGR", 
    marketCap: 149.64, 
    sector: "Finance"
   },
  { 
  
    name: "Xiaomi Corporation", 
    ticker: "1810", 
    marketCap: 148.5, 
    sector: "Technology"
   },
  { 
  
    name: "Bristol-Myers Squibb Company", 
    ticker: "BMY", 
    marketCap: 147.3, 
    sector: "Health Technology"
   },
  { 
  
    name: "AstraZeneca PLC", 
    ticker: "AZN", 
    marketCap: 146.8, 
    sector: "Health Technology"
   },
  { 
  
    name: "Texas Instruments Incorporated", 
    ticker: "TXN", 
    marketCap: 145.2, 
    sector: "Electronic Technology"
   },
  { 
  
    name: "Sanofi", 
    ticker: "SNY", 
    marketCap: 144.7, 
    sector: "Health Technology"
   },
  { 
  
    name: "Danaher Corporation", 
    ticker: "DHR", 
    marketCap: 143.5, 
    sector: "Health Technology"
   },
  { 
  
    name: "CME Group Inc.", 
    ticker: "CME", 
    marketCap: 142.9, 
    sector: "Finance"
   },
  { 
  
    name: "Honeywell International Inc.", 
    ticker: "HON", 
    marketCap: 141.8, 
    sector: "Producer Manufacturing"
   },
  { 
  
    name: "Tata Consultancy Services Limited", 
    ticker: "TCS", 
    marketCap: 140.6, 
    sector: "Technology Services"
   },
  { 
  
    name: "Unilever PLC", 
    ticker: "UL", 
    marketCap: 139.4, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "BHP Group Limited", 
    ticker: "BHP", 
    marketCap: 138.9, 
    sector: "Non-Energy Minerals"
   },
  { 
  
    name: "Union Pacific Corporation", 
    ticker: "UNP", 
    marketCap: 137.5, 
    sector: "Transportation"
   },
  { 
  
    name: "Altria Group, Inc.", 
    ticker: "MO", 
    marketCap: 136.2, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "T-Mobile US, Inc.", 
    ticker: "TMUS", 
    marketCap: 135.8, 
    sector: "Communications"
   },
  { 
  
    name: "Caterpillar Inc.", 
    ticker: "CAT", 
    marketCap: 134.5, 
    sector: "Producer Manufacturing"
   },
  { 
  
    name: "Medtronic plc", 
    ticker: "MDT", 
    marketCap: 133.2, 
    sector: "Health Technology"
   },
  { 
  
    name: "Anheuser-Busch InBev SA/NV", 
    ticker: "BUD", 
    marketCap: 132.7, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "PayPal Holdings, Inc.", 
    ticker: "PYPL", 
    marketCap: 131.4, 
    sector: "Technology Services"
   },
  { 
  
    name: "Advanced Micro Devices, Inc.", 
    ticker: "AMD", 
    marketCap: 130.1, 
    sector: "Electronic Technology"
   },
  { 
  
    name: "L'Oréal S.A.", 
    ticker: "OR.PA", 
    marketCap: 129.8, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "Toronto-Dominion Bank", 
    ticker: "TD", 
    marketCap: 128.5, 
    sector: "Finance"
   },
  { 
  
    name: "TotalEnergies SE", 
    ticker: "TTE", 
    marketCap: 127.2, 
    sector: "Energy Minerals"
   },
  { 
  
    name: "SAP SE", 
    ticker: "SAP", 
    marketCap: 126.9, 
    sector: "Technology Services"
   },
  { 
  
    name: "AIA Group Limited", 
    ticker: "AAGIY", 
    marketCap: 125.6, 
    sector: "Finance"
   },
  { 
  
    name: "S&P Global Inc.", 
    ticker: "SPGI", 
    marketCap: 124.3, 
    sector: "Commercial Services"
   },
  { 
  
    name: "Schneider Electric SE", 
    ticker: "SU.PA", 
    marketCap: 123.0, 
    sector: "Producer Manufacturing"
   },
  { 
  
    name: "Volkswagen AG", 
    ticker: "VWAGY", 
    marketCap: 121.7, 
    sector: "Consumer Durables"
   },
  { 
  
    name: "Charter Communications, Inc.", 
    ticker: "CHTR", 
    marketCap: 120.4, 
    sector: "Communications"
   },
  { 
  
    name: "Royal Bank of Canada", 
    ticker: "RY", 
    marketCap: 119.1, 
    sector: "Finance"
   },
  { 
  
    name: "Colgate-Palmolive Company", 
    ticker: "CL", 
    marketCap: 117.8, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "Aon plc", 
    ticker: "AON", 
    marketCap: 116.5, 
    sector: "Commercial Services"
   },
  { 
  
    name: "Fidelity National Info Services", 
    ticker: "FIS", 
    marketCap: 115.2, 
    sector: "Technology Services"
   },
  { 
  
    name: "Automatic Data Processing, Inc.", 
    ticker: "ADP", 
    marketCap: 113.9, 
    sector: "Technology Services"
   },
  { 
  
    name: "Boeing Company", 
    ticker: "BA", 
    marketCap: 112.6, 
    sector: "Electronic Technology"
   },
  { 
  
    name: "American Tower Corporation", 
    ticker: "AMT", 
    marketCap: 111.3, 
    sector: "Finance"
   },
  { 
  
    name: "Gilead Sciences, Inc.", 
    ticker: "GILD", 
    marketCap: 110.0, 
    sector: "Health Technology"
   },
  { 
  
    name: "Mondelez International, Inc.", 
    ticker: "MDLZ", 
    marketCap: 108.7, 
    sector: "Consumer Non-Durables"
   },
  { 
  
    name: "UBS Group AG", 
    ticker: "UBS", 
    marketCap: 107.4, 
    sector: "Finance"
   },
  { 
  
    name: "Intuitive Surgical, Inc.", 
    ticker: "ISRG", 
    marketCap: 106.1, 
    sector: "Health Technology"
   },
  
]
