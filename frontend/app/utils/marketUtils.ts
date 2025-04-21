import { Stock } from "../contexts/MarketContext";

/**
 * Converts numeric movement values in the stocks array to percentage strings.
 * @param stocks - Array of Stock objects with numeric movement values.
 * @returns New array of Stock objects with movement values as percentage strings.
 */
function formatStockMovements(stocks: Stock[]): Stock[] {
    return stocks.map(stock => ({
      ...stock,
      movement: {
        intraday: `${stock.movement.intraday}%`,
        daily: `${stock.movement.daily}%`,
        weekly: `${stock.movement.weekly}%`,
        monthly: `${stock.movement.monthly}%`,
        quarterly: `${stock.movement.quarterly}%`
      }
    }));
  }
  
  export default formatStockMovements;