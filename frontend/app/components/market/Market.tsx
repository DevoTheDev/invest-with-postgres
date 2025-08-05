import IntradayStockTimeSeries from "./time-series/subcomponents/IntradayStockTimeSeries";
import DailyStockTimeSeries from "./time-series/subcomponents/DailyStockTimeSeries";
import WeeklyStockTimeSeries from "./time-series/subcomponents/WeeklyStockTimeSeries";
import MonthlyStockTimeSeries from "./time-series/subcomponents/MonthlyStockTimeSeries";


const Market = {
    TimeSeries: {
        Intraday: IntradayStockTimeSeries ,
        Daily: DailyStockTimeSeries,
        Weekly: WeeklyStockTimeSeries,
        Monthly: MonthlyStockTimeSeries,
    }
}

export default Market;