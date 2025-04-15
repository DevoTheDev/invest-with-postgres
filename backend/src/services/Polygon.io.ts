// src/services/Polygon.io.ts
import { restClient } from "@polygon.io/client-js";
import { Request, Response } from "express";
const polygon = restClient(process.env.POLYGON_IO_KEY || "PV52UC0UkhnXU0ihkvi27Bdu_YctpZeB");

export async function getTickers(req: Request, res: Response): Promise<void> {
    try {
      const data = await polygon.reference.tickers({
        market: "stocks",
        active: "true",
        order: "asc",
        limit: 1000,
        sort: "ticker"
      });

      res.json(data);
  
    } catch (error) {
      console.error('Error fetching tickers:', error);
    }
}

export async function getTickerOverview(req: Request, res: Response): Promise<any> {
  const tickers = req.query.tickers as string;

  if (!tickers) {
    return res.status(400).json({ error: "Missing tickers parameter" });
  }

  const tickerArray = tickers.split(','); // Split the tickers into an array

  try {
    const overviews = await Promise.all(tickerArray.map(async (ticker) => {
      try {
        const data = await polygon.reference.tickerDetails(ticker);
        return { ticker, data }; // Return data with the ticker symbol
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return { ticker, error: "Failed to fetch data" };
      }
    }));

    return res.json(overviews); // Return all overviews in a single array
  } catch (error) {
    console.error("Error fetching ticker overviews:", error);
    return res.status(500).json({ error: "Error fetching ticker overviews" });
  }
}
  