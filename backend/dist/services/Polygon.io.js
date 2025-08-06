"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTickers = getTickers;
exports.getTickerOverview = getTickerOverview;
// src/services/Polygon.io.ts
const client_js_1 = require("@polygon.io/client-js");
const polygon = (0, client_js_1.restClient)(process.env.POLYGON_IO_KEY || "PV52UC0UkhnXU0ihkvi27Bdu_YctpZeB");
function getTickers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield polygon.reference.tickers({
                market: "stocks",
                active: "true",
                order: "desc",
                limit: 1000,
                sort: "ticker",
            });
            res.json(data);
        }
        catch (error) {
            console.error('Error fetching tickers:', error);
        }
    });
}
function getTickerOverview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tickers = req.query.tickers;
        if (!tickers) {
            return res.status(400).json({ error: "Missing tickers parameter" });
        }
        const tickerArray = tickers.split(','); // Split the tickers into an array
        try {
            const overviews = yield Promise.all(tickerArray.map((ticker) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield polygon.reference.tickerDetails(ticker);
                    return { ticker, data }; // Return data with the ticker symbol
                }
                catch (error) {
                    console.error(`Error fetching data for ${ticker}:`, error);
                    return { ticker, error: "Failed to fetch data" };
                }
            })));
            return res.json(overviews); // Return all overviews in a single array
        }
        catch (error) {
            console.error("Error fetching ticker overviews:", error);
            return res.status(500).json({ error: "Error fetching ticker overviews" });
        }
    });
}
