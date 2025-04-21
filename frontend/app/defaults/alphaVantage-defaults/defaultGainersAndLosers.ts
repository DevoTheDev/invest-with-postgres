/*

Get Top Gainers and Losers
Route: /top-gainers-losers

Method: GET

Query Parameters: None

Example URL: {{ericInvestUrl}}/api/alpha-vantage/top-gainers-losers

*/

import { TopGainersAndLosers } from "../../types/alphaVantageTypes";

export const defaultGainersAndLosers: TopGainersAndLosers = {
    "metadata": "Top gainers, losers, and most actively traded US tickers - DATA DELAYED BY 15 MINUTES",
    "last_updated": "2025-04-04 16:15:58 US/Eastern",
    "top_gainers": [
        {
            "ticker": "AREB",
            "price": "19.5",
            "change_amount": "15.54",
            "change_percentage": "392.4242%",
            "volume": "82214576"
        },
        {
            "ticker": "AREBW",
            "price": "0.059",
            "change_amount": "0.0427",
            "change_percentage": "261.9632%",
            "volume": "1712639"
        },
        {
            "ticker": "IBO",
            "price": "0.9474",
            "change_amount": "0.4834",
            "change_percentage": "104.181%",
            "volume": "114923687"
        },
        {
            "ticker": "AEHL",
            "price": "4.25",
            "change_amount": "2.13",
            "change_percentage": "100.4717%",
            "volume": "11033466"
        },
        {
            "ticker": "MSPRZ",
            "price": "0.039",
            "change_amount": "0.0189",
            "change_percentage": "94.0299%",
            "volume": "5400"
        },
        {
            "ticker": "CXAI",
            "price": "1.42",
            "change_amount": "0.6132",
            "change_percentage": "76.004%",
            "volume": "90903330"
        },
        {
            "ticker": "LOCL",
            "price": "4.5",
            "change_amount": "1.68",
            "change_percentage": "59.5745%",
            "volume": "469637"
        },
        {
            "ticker": "PETWW",
            "price": "0.0222",
            "change_amount": "0.008",
            "change_percentage": "56.338%",
            "volume": "66727"
        },
        {
            "ticker": "RIBBR",
            "price": "0.2411",
            "change_amount": "0.081",
            "change_percentage": "50.5934%",
            "volume": "903"
        },
        {
            "ticker": "XHG",
            "price": "1.11",
            "change_amount": "0.3675",
            "change_percentage": "49.4949%",
            "volume": "2900731"
        },
        {
            "ticker": "EONR+",
            "price": "0.064",
            "change_amount": "0.021",
            "change_percentage": "48.8372%",
            "volume": "5350"
        },
        {
            "ticker": "NUVB+",
            "price": "0.1599",
            "change_amount": "0.0499",
            "change_percentage": "45.3636%",
            "volume": "4841"
        },
        {
            "ticker": "DMAAR",
            "price": "0.13",
            "change_amount": "0.0398",
            "change_percentage": "44.1242%",
            "volume": "11562"
        },
        {
            "ticker": "WCT",
            "price": "0.28",
            "change_amount": "0.085",
            "change_percentage": "43.5897%",
            "volume": "198040183"
        },
        {
            "ticker": "SOBR",
            "price": "4.87",
            "change_amount": "1.399",
            "change_percentage": "40.3054%",
            "volume": "1246870"
        },
        {
            "ticker": "MHLD",
            "price": "0.7904",
            "change_amount": "0.2257",
            "change_percentage": "39.9681%",
            "volume": "628520"
        },
        {
            "ticker": "UVIX",
            "price": "73.33",
            "change_amount": "20.73",
            "change_percentage": "39.4106%",
            "volume": "13110627"
        },
        {
            "ticker": "FORD",
            "price": "6.8",
            "change_amount": "1.88",
            "change_percentage": "38.2114%",
            "volume": "513917"
        },
        {
            "ticker": "ICCT",
            "price": "5.71",
            "change_amount": "1.48",
            "change_percentage": "34.9882%",
            "volume": "82449975"
        },
        {
            "ticker": "BTBDW",
            "price": "0.0556",
            "change_amount": "0.0144",
            "change_percentage": "34.9515%",
            "volume": "4420"
        }
    ],
    "top_losers": [
        {
            "ticker": "SMXWW",
            "price": "0.0151",
            "change_amount": "-0.0223",
            "change_percentage": "-59.6257%",
            "volume": "18642"
        },
        {
            "ticker": "JSPRW",
            "price": "0.0626",
            "change_amount": "-0.0674",
            "change_percentage": "-51.8462%",
            "volume": "27920"
        },
        {
            "ticker": "CSLRW",
            "price": "0.1112",
            "change_amount": "-0.1008",
            "change_percentage": "-47.5472%",
            "volume": "33437"
        },
        {
            "ticker": "SBXD+",
            "price": "0.264",
            "change_amount": "-0.236",
            "change_percentage": "-47.2%",
            "volume": "67"
        },
        {
            "ticker": "RFL+",
            "price": "0.154",
            "change_amount": "-0.126",
            "change_percentage": "-45.0%",
            "volume": "4311"
        },
        {
            "ticker": "NMTC",
            "price": "0.475",
            "change_amount": "-0.385",
            "change_percentage": "-44.7674%",
            "volume": "1976089"
        },
        {
            "ticker": "JQC^",
            "price": "0.008",
            "change_amount": "-0.0062",
            "change_percentage": "-43.662%",
            "volume": "3597182"
        },
        {
            "ticker": "NEHCW",
            "price": "0.0548",
            "change_amount": "-0.0403",
            "change_percentage": "-42.3764%",
            "volume": "179757"
        },
        {
            "ticker": "NE+A",
            "price": "2.6",
            "change_amount": "-1.9",
            "change_percentage": "-42.2222%",
            "volume": "1790"
        },
        {
            "ticker": "DDC",
            "price": "0.085",
            "change_amount": "-0.0595",
            "change_percentage": "-41.1765%",
            "volume": "748609"
        },
        {
            "ticker": "IVDAW",
            "price": "0.1",
            "change_amount": "-0.0693",
            "change_percentage": "-40.9333%",
            "volume": "14437"
        },
        {
            "ticker": "TNONW",
            "price": "0.0162",
            "change_amount": "-0.0104",
            "change_percentage": "-39.0977%",
            "volume": "64315"
        },
        {
            "ticker": "CDTTW",
            "price": "0.0081",
            "change_amount": "-0.0048",
            "change_percentage": "-37.2093%",
            "volume": "12762"
        },
        {
            "ticker": "BIAFW",
            "price": "0.19",
            "change_amount": "-0.11",
            "change_percentage": "-36.6667%",
            "volume": "4610"
        },
        {
            "ticker": "HLLY+",
            "price": "0.035",
            "change_amount": "-0.0201",
            "change_percentage": "-36.4791%",
            "volume": "75251"
        },
        {
            "ticker": "HPKEW",
            "price": "0.738",
            "change_amount": "-0.412",
            "change_percentage": "-35.8261%",
            "volume": "13068"
        },
        {
            "ticker": "AENTW",
            "price": "0.1555",
            "change_amount": "-0.0844",
            "change_percentage": "-35.1813%",
            "volume": "37327"
        },
        {
            "ticker": "BSIIW",
            "price": "0.2479",
            "change_amount": "-0.132",
            "change_percentage": "-34.746%",
            "volume": "653"
        },
        {
            "ticker": "AMBI+",
            "price": "0.1575",
            "change_amount": "-0.0825",
            "change_percentage": "-34.375%",
            "volume": "125"
        },
        {
            "ticker": "MKDWW",
            "price": "0.0091",
            "change_amount": "-0.0046",
            "change_percentage": "-33.5766%",
            "volume": "160191"
        }
    ],
    "most_actively_traded": [
        {
            "ticker": "NVDA",
            "price": "94.31",
            "change_amount": "-7.49",
            "change_percentage": "-7.3576%",
            "volume": "525636001"
        },
        {
            "ticker": "SOXL",
            "price": "8.72",
            "change_amount": "-2.69",
            "change_percentage": "-23.5758%",
            "volume": "486944158"
        },
        {
            "ticker": "MULN",
            "price": "0.0775",
            "change_amount": "-0.002",
            "change_percentage": "-2.5157%",
            "volume": "361607186"
        },
        {
            "ticker": "TSLL",
            "price": "7.94",
            "change_amount": "-2.09",
            "change_percentage": "-20.8375%",
            "volume": "336079232"
        },
        {
            "ticker": "DMN",
            "price": "0.0139",
            "change_amount": "-0.0012",
            "change_percentage": "-7.947%",
            "volume": "276061436"
        },
        {
            "ticker": "TQQQ",
            "price": "41.09",
            "change_amount": "-9.21",
            "change_percentage": "-18.3101%",
            "volume": "252914557"
        },
        {
            "ticker": "SQQQ",
            "price": "50.36",
            "change_amount": "7.83",
            "change_percentage": "18.4105%",
            "volume": "225211119"
        },
        {
            "ticker": "SPY",
            "price": "505.54",
            "change_amount": "-31.16",
            "change_percentage": "-5.8059%",
            "volume": "208391500"
        },
        {
            "ticker": "WCT",
            "price": "0.28",
            "change_amount": "0.085",
            "change_percentage": "43.5897%",
            "volume": "198040183"
        },
        {
            "ticker": "HYG",
            "price": "76.8",
            "change_amount": "-1.07",
            "change_percentage": "-1.3741%",
            "volume": "179085384"
        },
        {
            "ticker": "TSLA",
            "price": "239.43",
            "change_amount": "-27.85",
            "change_percentage": "-10.4198%",
            "volume": "177561668"
        },
        {
            "ticker": "F",
            "price": "9.585",
            "change_amount": "0.045",
            "change_percentage": "0.4717%",
            "volume": "177141169"
        },
        {
            "ticker": "INTC",
            "price": "19.85",
            "change_amount": "-2.58",
            "change_percentage": "-11.5025%",
            "volume": "173473135"
        },
        {
            "ticker": "FXI",
            "price": "32.77",
            "change_amount": "-2.45",
            "change_percentage": "-6.9563%",
            "volume": "159805088"
        },
        {
            "ticker": "TSLZ",
            "price": "4.67",
            "change_amount": "0.81",
            "change_percentage": "20.9845%",
            "volume": "148816822"
        },
        {
            "ticker": "PLTR",
            "price": "74.01",
            "change_amount": "-9.59",
            "change_percentage": "-11.4713%",
            "volume": "145669792"
        },
        {
            "ticker": "SPXS",
            "price": "9.34",
            "change_amount": "1.42",
            "change_percentage": "17.9293%",
            "volume": "129628280"
        },
        {
            "ticker": "XLF",
            "price": "44.19",
            "change_amount": "-3.5",
            "change_percentage": "-7.3391%",
            "volume": "126820332"
        },
        {
            "ticker": "AAPL",
            "price": "188.38",
            "change_amount": "-14.81",
            "change_percentage": "-7.2887%",
            "volume": "124923423"
        },
        {
            "ticker": "RSLS",
            "price": "0.46",
            "change_amount": "0.0803",
            "change_percentage": "21.1483%",
            "volume": "121835143"
        }
    ]
}