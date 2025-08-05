/*

Get News Sentiment
Route: /news-sentiment

Method: GET

Query Parameters:

tickers (optional): Comma-separated list of ticker symbols (e.g., AAPL,GOOG).

topics (optional): Comma-separated list of topics (e.g., tech,finance).

timeFrom (optional): Start date for news (e.g., 2025-01-01).

timeTo (optional): End date for news (e.g., 2025-02-01).

sort (optional): Sorting method (LATEST or RELEVANT).

limit (optional): Limit the number of results (default is 50).

Example URL: {{ericInvestUrl}}/api/alpha-vantage/news-sentiment?tickers=AAPL,GOOG&topics=tech,finance&timeFrom=2025-01-01&timeTo=2025-02-01&sort=LATEST&limit=10

*/

export type SentimentLabel =
  | "Bearish"
  | "Somewhat-Bearish"
  | "Neutral"
  | "Somewhat-Bullish"
  | "Bullish";

export interface TopicSentiment {
  topic: string;
  relevance_score: string; // These are strings in the response
}

export interface TickerSentiment {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: SentimentLabel;
}

export interface NewsFeedItem {
  title: string;
  url: string;
  time_published: string; // e.g., "20250805T080000"
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: TopicSentiment[];
  overall_sentiment_score: number;
  overall_sentiment_label: SentimentLabel;
  ticker_sentiment: TickerSentiment[];
}

export interface NewsSentimentsResponse {
  items: string; // e.g., "50"
  sentiment_score_definition: string;
  relevance_score_definition: string;
  feed: NewsFeedItem[];
}


export const defaultNewsSentiments = {
    "items": "50",
    "sentiment_score_definition": "x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish",
    "relevance_score_definition": "0 < x <= 1, with a higher score indicating higher relevance.",
    "feed": [
        {
            "title": "Bull of the Day: Netflix, Inc.  ( NFLX ) ",
            "url": "https://www.zacks.com/commentary/2663897/bull-of-the-day-netflix-inc-nflx",
            "time_published": "20250805T080000",
            "authors": [
                "Benjamin Rains"
            ],
            "summary": "Netflix is one of the best non-AI technology stocks to buy for long-term growth and surprising value. Its July pullback has the tech-crushing streaming stock trading around 15% below its highs.",
            "banner_image": "https://staticx-tuner.zacks.com/images/default_article_images/default203.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999864"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.99246"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.22947,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "NFLX",
                    "relevance_score": "0.803892",
                    "ticker_sentiment_score": "0.303141",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.035555",
                    "ticker_sentiment_score": "0.190639",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.07104",
                    "ticker_sentiment_score": "-0.010292",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.106384",
                    "ticker_sentiment_score": "0.02629",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Prediction: 1 Artificial Intelligence  ( AI )  Stock Will Be Worth More Than Palantir Technologies and Nvidia Combined by 2030",
            "url": "https://www.fool.com/investing/2025/08/05/1-ai-stock-worth-more-palantir-nvidia-stock/",
            "time_published": "20250805T075500",
            "authors": [
                "Trevor Jennewine"
            ],
            "summary": "Meta Platforms could be a $4.7 trillion company in five years, in which case it would be worth more than Palantir and Nvidia combined today.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F827874%2Fmoney-19.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.161647"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.938238"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.445686,
            "overall_sentiment_label": "Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.050254",
                    "ticker_sentiment_score": "0.253431",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.655534",
                    "ticker_sentiment_score": "0.617406",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.149966",
                    "ticker_sentiment_score": "0.09203",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.100308",
                    "ticker_sentiment_score": "0.205133",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "PLTR",
                    "relevance_score": "0.050254",
                    "ticker_sentiment_score": "0.250423",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Why Apple Stock Lagged the Market on Monday",
            "url": "https://www.fool.com/investing/2025/08/04/why-apple-stock-lagged-the-market-on-monday/",
            "time_published": "20250804T213900",
            "authors": [
                "Eric Volkman"
            ],
            "summary": "The tech giant isn't so mighty, according to one researcher.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F827985%2Fconcerned-young-person-with-head-in-hands-gazing-at-a-screen.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.108179"
                }
            ],
            "overall_sentiment_score": 0.014742,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.38489",
                    "ticker_sentiment_score": "-0.197609",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.759278",
                    "ticker_sentiment_score": "0.095296",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "BCS",
                    "relevance_score": "0.38489",
                    "ticker_sentiment_score": "0.045647",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Palantir Earnings Will Impact Market Sentiment; Rate Cut Hopes Fuel Buying - Palantir Technologies  ( NASDAQ:PLTR ) ",
            "url": "https://www.benzinga.com/markets/equities/25/08/46837696/palantir-earnings-will-impact-market-sentiment-rate-cut-hopes-fuel-buying",
            "time_published": "20250804T191258",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of Palantir Technologies Inc PLTR. PLTR is the momo crowd's favorite AI software stock. PLTR stock is the most expensive stock in the S&P 500 by P/S.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999955"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.287623,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.116914",
                    "ticker_sentiment_score": "0.123318",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.116914",
                    "ticker_sentiment_score": "0.123318",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.116914",
                    "ticker_sentiment_score": "0.123318",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.116914",
                    "ticker_sentiment_score": "0.123318",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.116914",
                    "ticker_sentiment_score": "0.123318",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.116914",
                    "ticker_sentiment_score": "0.123318",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.058615",
                    "ticker_sentiment_score": "0.307137",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "PLTR",
                    "relevance_score": "0.286864",
                    "ticker_sentiment_score": "0.182228",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Meta's AI Dream Team Is Defecting: Elon Musk Isn't Even Overpaying - Meta Platforms  ( NASDAQ:META ) ",
            "url": "https://www.benzinga.com/markets/tech/25/08/46830377/metas-pricey-pursuit-of-ai-talent-draws-mockery-from-musk",
            "time_published": "20250804T150353",
            "authors": [
                "Surbhi Jain"
            ],
            "summary": "Meta invests $14.3B in Scale AI, boosting its AI talent war with billion-dollar recruitment packages. Elon Musk counters with xAI's merit-based culture, attracting top engineers without massive upfront salaries. Get special access to three exclusive \"Top 10 Stocks\" power lists today, updated daily.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/08/04/Menlo-Park--Usa--May-5--2023-Meta-Corpor_1.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.161647"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.145465,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.146025",
                    "ticker_sentiment_score": "0.046913",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.146025",
                    "ticker_sentiment_score": "0.251684",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.2872",
                    "ticker_sentiment_score": "0.186792",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.146025",
                    "ticker_sentiment_score": "-0.192775",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                }
            ]
        },
        {
            "title": "Google Loses Epic Games Appeal As Court Orders Major Play Store Reforms Amid Antitrust Crackdown - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/08/46820690/google-loses-epic-games-appeal-as-court-orders-major-play-store-reforms-amid-antitrust-crackdown",
            "time_published": "20250804T074139",
            "authors": [
                "Ananya Gairola"
            ],
            "summary": "Alphabet Inc.'s GOOG GOOGL Google has suffered a significant legal blow as a U.S. appeals court upheld a lower court ruling requiring the tech giant to overhaul its Play Store operations. ArrivedBuy shares of homes and vacation rentals for as little as $100. Get Started",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/08/04/Close-Up-Of-The-Google-Logo-Sign-On-The-.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.214378"
                }
            ],
            "overall_sentiment_score": 0.151983,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.68732",
                    "ticker_sentiment_score": "0.265934",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.386306",
                    "ticker_sentiment_score": "-0.032337",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TCTZF",
                    "relevance_score": "0.05749",
                    "ticker_sentiment_score": "-0.081614",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Should You Buy Sirius XM Stock After Earnings?",
            "url": "https://www.fool.com/investing/2025/08/03/should-you-buy-sirius-xm-stock-after-earnings/",
            "time_published": "20250803T220500",
            "authors": [
                "Neil Patel"
            ],
            "summary": "Based on the market's immediate reaction, investors weren't pleased with the satellite radio operator's latest results.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F826131%2Fhand-on-car-entertainment-system.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.365926"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.993856"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.233092,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.064797",
                    "ticker_sentiment_score": "0.08402",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.064797",
                    "ticker_sentiment_score": "0.08402",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "SIRI",
                    "relevance_score": "0.670742",
                    "ticker_sentiment_score": "0.357707",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "SPOT",
                    "relevance_score": "0.064797",
                    "ticker_sentiment_score": "0.08402",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "BRK-A",
                    "relevance_score": "0.064797",
                    "ticker_sentiment_score": "-0.044027",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "'I Don't Do Anything Other Than Working,' Says Perplexity CEO Aravind Srinivas As His $14 Billion AI Startup Challenges Tech Giants - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/news/topics/25/08/46815754/i-dont-do-anything-other-than-working-says-perplexity-ceo-aravind-srinivas-as-his-14-billion-ai-start",
            "time_published": "20250802T153027",
            "authors": [
                "Casey B. Renner"
            ],
            "summary": "Perplexity Chief Executive Officer Aravind Srinivas says speed and urgency are nonnegotiable as his artificial intelligence startup races tech giants. \"I don't do anything other than working,\" Aravind Srinivas admitted in a Reddit Ask Me Anything in May, emphasizing the intense focus needed to ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/08/02/Startup-Funding---Act-Of-Raising-Capital.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "IPO",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.108179"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.07883,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.194242",
                    "ticker_sentiment_score": "0.11249",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.130217",
                    "ticker_sentiment_score": "0.086895",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.194242",
                    "ticker_sentiment_score": "0.11249",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "HAS",
                    "relevance_score": "0.065327",
                    "ticker_sentiment_score": "0.11517",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "RDDT",
                    "relevance_score": "0.194242",
                    "ticker_sentiment_score": "0.018877",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Tech Stocks Trace A Negative Pattern; Trump Weaponizes Tariffs",
            "url": "https://www.benzinga.com/general/market-summary/25/08/46803424/tech-stocks-trace-a-negative-pattern-figmazation-of-momo-crowd-trump-weaponizes-tariffs",
            "time_published": "20250801T170708",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of Invesco QQQ Trust Series 1 ( QQQ ) . President Trump has imposed sweeping tariffs on countries that have not yet reached a deal. The most notable are high tariffs of 39% on Switzerland and 35% on ...",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.998663"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.173046,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.104002",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.104002",
                    "ticker_sentiment_score": "-0.134568",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.104002",
                    "ticker_sentiment_score": "-0.134568",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.104002",
                    "ticker_sentiment_score": "-0.134568",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.104002",
                    "ticker_sentiment_score": "0.286827",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.104002",
                    "ticker_sentiment_score": "-0.134568",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.052112",
                    "ticker_sentiment_score": "0.285793",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Apple Q2 Beat: iPhone, Services Offset Tariffs - Apple  ( NASDAQ:AAPL ) , Amazon.com  ( NASDAQ:AMZN ) ",
            "url": "https://www.benzinga.com/analyst-stock-ratings/analyst-color/25/08/46800037/apple-stock-reports-surprisingly-strong-quarter-analysts-say-iphone-services-",
            "time_published": "20250801T154642",
            "authors": [
                "Chris Katje"
            ],
            "summary": "Apple showed strong results for products and services in the third quarter, leading to some price target increases from analysts. Some analyst remain cautious on Apple, wanting more from the company in the AI sector. Get special access to three exclusive \"Top 10 Stocks\" power lists today, ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/08/01/Dublin--Ireland---11---11---2015-Apple-C_1.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.266143"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.938793"
                },
                {
                    "topic": "Mergers & Acquisitions",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.23133,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.099066",
                    "ticker_sentiment_score": "-0.0518",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.099066",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.918621",
                    "ticker_sentiment_score": "0.494165",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "BAC",
                    "relevance_score": "0.099066",
                    "ticker_sentiment_score": "0.077277",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Take a Bite of Apple's Solid Q3 Earnings With These ETFs",
            "url": "https://www.zacks.com/stock/news/2649303/take-a-bite-of-apples-solid-q3-earnings-with-these-etfs",
            "time_published": "20250801T140000",
            "authors": [
                "Zacks Investment Research"
            ],
            "summary": "As AAPL pops on earnings, ETFs like GXPT, VGT, FTEC and others could see an upside given their Apple-heavy portfolios.",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/ef/1522.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.875462"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999953"
                }
            ],
            "overall_sentiment_score": 0.163494,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.090989",
                    "ticker_sentiment_score": "0.007374",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.045569",
                    "ticker_sentiment_score": "0.006946",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.639433",
                    "ticker_sentiment_score": "0.248602",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Apple  ( AAPL )  Q3 2025 Earnings Call Transcript",
            "url": "https://www.fool.com/earnings/call-transcripts/2025/08/01/apple-aapl-q3-2025-earnings-call-transcript/",
            "time_published": "20250801T133649",
            "authors": [
                "Motley Fool Transcribing"
            ],
            "summary": "Image source: The Motley Fool.Thursday, July 31, 2025 at 5 p.m. ETChief Executive Officer - Timothy D. CookContinue reading ...",
            "banner_image": "https://cdn.content.foolcdn.com/images/1umn9qeh/production/a2a40ac227551191f40e319646e58c421fd8b8c0-400x427.png",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Energy & Transportation",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Mergers & Acquisitions",
                    "relevance_score": "0.650727"
                }
            ],
            "overall_sentiment_score": 0.275536,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "EVR",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "PYPL",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.155602",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.0097",
                    "ticker_sentiment_score": "0.05628",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.220243",
                    "ticker_sentiment_score": "0.286369",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "C",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "MP",
                    "relevance_score": "0.0194",
                    "ticker_sentiment_score": "0.110529",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "BAC",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "CAE",
                    "relevance_score": "0.0097",
                    "ticker_sentiment_score": "0.1382",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "MS",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AWON",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.024567",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GS",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.116939",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "WFC",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "XIACY",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.172502",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "FOREX:GBP",
                    "relevance_score": "0.00485",
                    "ticker_sentiment_score": "0.117802",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Prediction: 2 Artificial Intelligence  ( AI )  Stocks Will Be Worth More Than Apple by 2030  ( Hint: Not Nvidia ) ",
            "url": "https://www.fool.com/investing/2025/08/01/2-ai-stocks-worth-more-than-apple-stock-not-nvidia/",
            "time_published": "20250801T080400",
            "authors": [
                "Trevor Jennewine"
            ],
            "summary": "Meta Platforms and Broadcom are at the center of the artificial intelligence revolution, and that could help both companies surpass Apple's current market value within five years.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F827511%2Fgrowth-7.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.108179"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.998917"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.428216,
            "overall_sentiment_label": "Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.100518",
                    "ticker_sentiment_score": "0.174039",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.430251",
                    "ticker_sentiment_score": "0.48119",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.050359",
                    "ticker_sentiment_score": "0.191308",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.100518",
                    "ticker_sentiment_score": "0.15684",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AVGO",
                    "relevance_score": "0.430251",
                    "ticker_sentiment_score": "0.394945",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "MS",
                    "relevance_score": "0.050359",
                    "ticker_sentiment_score": "0.107306",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "ASCCF",
                    "relevance_score": "0.150278",
                    "ticker_sentiment_score": "0.137268",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Apple Surges After-Hours As Q3 Earnings Crush Estimates, iPhone And Services Lead Growth - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/equities/25/07/46781721/apple-surges-after-hours-as-q3-earnings-crush-estimates-iphone-and-services-lead-growth",
            "time_published": "20250801T035932",
            "authors": [
                "Mohd Haider"
            ],
            "summary": "Apple Inc. AAPL shares jumped 2.42% in after-hours trading on Thursday, reaching $212.59, after the iPhone maker delivered third-quarter results that significantly exceeded Wall Street expectations.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/31/Pune--India---February-19--2024--Apple-i.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "Markets",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.365926"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.995973"
                },
                {
                    "topic": "Mergers & Acquisitions",
                    "relevance_score": "0.360215"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Economy - Macro",
                    "relevance_score": "0.158519"
                }
            ],
            "overall_sentiment_score": 0.216729,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.170275",
                    "ticker_sentiment_score": "0.031013",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.170275",
                    "ticker_sentiment_score": "0.031013",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.170275",
                    "ticker_sentiment_score": "0.031013",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.481177",
                    "ticker_sentiment_score": "0.317646",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Tim Cook Says Apple Is 'Very Open' To AI Acquisitions Amid Mounting Pressure To Catch Up With Google, Meta And Microsoft - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46781140/tim-cook-says-apple-is-very-open-to-ai-acquisitions-amid-mounting-pressure-to-catch-up-with-google-m",
            "time_published": "20250801T020455",
            "authors": [
                "Ananya Gairola"
            ],
            "summary": "On Thursday, Apple Inc. AAPL CEO Tim Cook said the company is open to considering artificial intelligence acquisitions. During Apple's third-quarter earnings call, Citi analyst Atas Malik asked whether the company would accelerate its AI roadmap through major mergers and acquisitions.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/31/Apple-Eyes-Rebound-with-Slim-iPhone--Ser.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.316726"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.360215"
                },
                {
                    "topic": "Mergers & Acquisitions",
                    "relevance_score": "0.684621"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.116307,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.241284",
                    "ticker_sentiment_score": "-0.093166",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.317869",
                    "ticker_sentiment_score": "-0.1164",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.241284",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.694113",
                    "ticker_sentiment_score": "0.220794",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "C",
                    "relevance_score": "0.081552",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "MAGS ETF Hits Record High As Microsoft And Meta Earnings Fuel Tech Rally - Roundhill Magnificent Seven ETF  ( BATS:MAGS ) ",
            "url": "https://www.benzinga.com/trading-ideas/movers/25/07/46772973/mags-etf-hits-record-high-as-microsoft-and-meta-earnings-fuel-tech-rally",
            "time_published": "20250731T194430",
            "authors": [
                "Henry Khederian"
            ],
            "summary": "The Roundhill Magnificent Seven ETF surged to an all-time high Thursday morning. The ETF is being powered by blockbuster quarterly earnings from key holdings Microsoft and Meta Platforms. Get special access to three exclusive \"Top 10 Stocks\" power lists today, updated daily.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/31/Nvidia--Micron-Technology--Super-Micro-C.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.891286"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.98396"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.296208,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.413199",
                    "ticker_sentiment_score": "0.353737",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.172097",
                    "ticker_sentiment_score": "0.146975",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.33628",
                    "ticker_sentiment_score": "0.456372",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.172097",
                    "ticker_sentiment_score": "0.146975",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.255641",
                    "ticker_sentiment_score": "0.23159",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.172097",
                    "ticker_sentiment_score": "0.146975",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "MS",
                    "relevance_score": "0.086556",
                    "ticker_sentiment_score": "0.118405",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GS",
                    "relevance_score": "0.086556",
                    "ticker_sentiment_score": "0.118405",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Priced For Perfection - Stock Market To Face Most Critical Two Days, Fed Rate Decision, META and MSFT Earnings Ahead - Meta Platforms  ( NASDAQ:META ) ",
            "url": "https://www.benzinga.com/news/earnings/25/07/46732938/priced-for-perfection-stock-market-to-face-most-critical-two-days-fed-rate-decision-meta-and-msft-e",
            "time_published": "20250730T180453",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of Meta Platforms Inc META. Q2 GDP-Adv. came at 3.0% vs. 2.5% consensus. GDP Deflator-Adv. came at 2.0% vs. 2.6% consensus.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.310843"
                },
                {
                    "topic": "Economy - Fiscal",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999819"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Real Estate & Construction",
                    "relevance_score": "0.2"
                }
            ],
            "overall_sentiment_score": 0.254875,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.103554",
                    "ticker_sentiment_score": "0.198368",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.103554",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.154785",
                    "ticker_sentiment_score": "0.247401",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.103554",
                    "ticker_sentiment_score": "0.198368",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.103554",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.103554",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "APG",
                    "relevance_score": "0.051886",
                    "ticker_sentiment_score": "-0.170534",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.051886",
                    "ticker_sentiment_score": "0.306813",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.103554",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Could Trump Accounts Turn American Babies Into Tomorrow's Millionaires? Here's What Experts Say - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/personal-finance/management/25/07/46716370/could-trump-accounts-turn-american-babies-into-tomorrows-millionaires-heres-what-expe",
            "time_published": "20250730T104718",
            "authors": [
                "Namrata Sen"
            ],
            "summary": "A new federal savings initiative, known as \"Trump accounts,\" signed into law by President Donald Trump, could significantly alter the financial future of millions of American children. What Happened: The Trump Accounts initiative, part of the One Big Beautiful Bill Act, will provide a $1,000 head ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/30/Mother-Holding-Baby-Hand-Close-up--Happy.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.980922"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.252535,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.149192",
                    "ticker_sentiment_score": "0.240844",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.149192",
                    "ticker_sentiment_score": "0.240844",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.149192",
                    "ticker_sentiment_score": "0.240844",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "After OpenAI And Google, Mark Zuckerberg Sets Sights On This 50-Person Startup, Offering Billions To Lure Top Talent: Report - Alphabet  ( NASDAQ:GOOGL ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46714557/after-openai-and-google-mark-zuckerberg-sets-sights-on-this-50-person-startup-offering-billions-to-l",
            "time_published": "20250730T090405",
            "authors": [
                "Namrata Sen"
            ],
            "summary": "Meta Platform's META CEO, Mark Zuckerberg, is reportedly on a mission to recruit top AI researchers from Thinking Machines Lab for his new venture, Meta Superintelligence Labs. What Happened: Zuckerberg's Meta Superintelligence Labs is making aggressive moves to acquire leading AI talent from ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/30/In-This-Photo-The-Logo-Of-Meta-Ai-Is-Dis.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.214378"
                }
            ],
            "overall_sentiment_score": 0.180154,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.087185",
                    "ticker_sentiment_score": "0.04831",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.257442",
                    "ticker_sentiment_score": "0.094432",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.173333",
                    "ticker_sentiment_score": "0.068942",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Why Spotify Won't Raise Prices Like Peacock: CEO Explains The 'Pedestal' Strategy - Apple  ( NASDAQ:AAPL ) , Amazon.com  ( NASDAQ:AMZN ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46712204/why-spotify-wont-raise-prices-like-peacock-ceo-explains-the-pedestal-strategy",
            "time_published": "20250730T052349",
            "authors": [
                "Ananya Gairola"
            ],
            "summary": "On Tuesday, Spotify Inc. SPOT executives addressed concerns over pricing strategy during the company's second-quarter 2025 earnings call.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/30/July-16--2021--Brazil--In-This-Photo-Ill.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.360215"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.316726"
                }
            ],
            "overall_sentiment_score": 0.153863,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.271777",
                    "ticker_sentiment_score": "0.098694",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.183198",
                    "ticker_sentiment_score": "0.072278",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "CCZ",
                    "relevance_score": "0.092213",
                    "ticker_sentiment_score": "0.077991",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "SPOT",
                    "relevance_score": "0.702807",
                    "ticker_sentiment_score": "0.193859",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Microsoft Is Frustrating The Ability Of Users To Switch Away From The Edge Browser, Alleges Opera In Brazil Anti-Trust Complaint - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46710674/microsoft-is-frustrating-the-ability-of-users-to-switch-away-from-the-edge-browser-alleges-opera-in-",
            "time_published": "20250730T020800",
            "authors": [
                "Ananya Gairola"
            ],
            "summary": "On Tuesday, Opera Ltd OPRA filed a formal complaint with Brazil's antitrust regulator, alleging Microsoft Corporation MSFT gives its Edge browser an unfair advantage on Windows devices at the expense of rivals.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/29/Portland--Or--Usa---Aug-9--2020-Assorted.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.714479"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.316726"
                }
            ],
            "overall_sentiment_score": 0.124106,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.806399",
                    "ticker_sentiment_score": "0.164764",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "SSNLF",
                    "relevance_score": "0.079656",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.235823",
                    "ticker_sentiment_score": "0.215661",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.158519",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "OPRA",
                    "relevance_score": "0.682689",
                    "ticker_sentiment_score": "0.057128",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "3 Millionaire-Maker Artificial Intelligence  ( AI )  Stocks?",
            "url": "https://www.fool.com/investing/2025/07/29/3-millionaire-maker-artificial-intelligence-ai-sto/",
            "time_published": "20250730T000700",
            "authors": [
                "Geoffrey Seiler"
            ],
            "summary": "These three stocks have home run potential.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F826782%2Fgettyimages-1472292349.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.214378"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.684621"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.273662,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.043738",
                    "ticker_sentiment_score": "0.080254",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "APP",
                    "relevance_score": "0.173645",
                    "ticker_sentiment_score": "0.095454",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.087344",
                    "ticker_sentiment_score": "0.028211",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.130689",
                    "ticker_sentiment_score": "0.233236",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.130689",
                    "ticker_sentiment_score": "0.032659",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMD",
                    "relevance_score": "0.216087",
                    "ticker_sentiment_score": "0.291775",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "PLTR",
                    "relevance_score": "0.087344",
                    "ticker_sentiment_score": "0.084448",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Sirius XM Gears Up to Report Q2 Earnings: What's in the Offing?",
            "url": "https://www.zacks.com/stock/news/2634804/sirius-xm-gears-up-to-report-q2-earnings-whats-in-the-offing",
            "time_published": "20250729T163500",
            "authors": [
                "Zacks Equity Research"
            ],
            "summary": "SIRI's second-quarter 2025 performance is likely to have been pressured by subscriber losses, rising costs and stiff streaming competition.",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/97/55377.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.990893"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                }
            ],
            "overall_sentiment_score": -0.048155,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.125134",
                    "ticker_sentiment_score": "0.138807",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.247208",
                    "ticker_sentiment_score": "0.219454",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "SIRI",
                    "relevance_score": "0.41849",
                    "ticker_sentiment_score": "0.184114",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "SPOT",
                    "relevance_score": "0.125134",
                    "ticker_sentiment_score": "0.002371",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "What Prudent Investors Should Know As All-Time-Market-Highs Mix With Extreme Sentiment - SPDR S&P 500  ( ARCA:SPY ) ",
            "url": "https://www.benzinga.com/markets/equities/25/07/46695668/what-prudent-investors-should-know-as-all-time-market-highs-mix-with-extreme-sentiment",
            "time_published": "20250729T155328",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of SPDR S&P 500 ETF Trust SPY which represents the benchmark stock market index S&P 500 ( SPX ) . The stock market continues to hit new all time highs.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Energy & Transportation",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.451494"
                },
                {
                    "topic": "Economy - Fiscal",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.2"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.310843"
                }
            ],
            "overall_sentiment_score": 0.188766,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "PYPL",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.005231",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "-0.194639",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.131403",
                    "ticker_sentiment_score": "0.006023",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.224895",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.174587",
                    "ticker_sentiment_score": "0.007182",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "SPOT",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.005231",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.043979",
                    "ticker_sentiment_score": "0.236622",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "UNH",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.005231",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.174587",
                    "ticker_sentiment_score": "0.007182",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "SYY",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.005231",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "-0.194639",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "UPS",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.005231",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "RCL",
                    "relevance_score": "0.087824",
                    "ticker_sentiment_score": "0.005231",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.131403",
                    "ticker_sentiment_score": "0.055636",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Thinking of Buying Apple Stock? You Need to Hear What Google's CEO Just Said.",
            "url": "https://www.fool.com/investing/2025/07/29/buying-apple-stock-google-ceo-said/",
            "time_published": "20250729T084200",
            "authors": [
                "Keith Speights"
            ],
            "summary": "Google CEO Sundar Pichai's comments about AI glasses are especially relevant to Apple's future.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F826870%2Fsquinting-at-smartphone-over-glasses.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.614606"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.87644"
                }
            ],
            "overall_sentiment_score": 0.156455,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.302553",
                    "ticker_sentiment_score": "0.160464",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TRMNF",
                    "relevance_score": "0.051663",
                    "ticker_sentiment_score": "0.228605",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.635661",
                    "ticker_sentiment_score": "0.238269",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "WRBY",
                    "relevance_score": "0.103109",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Apple Faces 18-Month Deadline To Deliver On AI, Says Analyst - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46680504/apple-faces-18-month-deadline-to-deliver-on-ai-says-analyst",
            "time_published": "20250729T083517",
            "authors": [
                "Namrata Sen"
            ],
            "summary": "Apple Inc. AAPL has 18 months to revamp its Apple Intelligence strategy, according to a leading analyst. The analyst also predicts the release of a folding iPhone in 2026. What Happened: Investment firm TD Cowen has set a deadline for Apple to make its AI strategy more compelling.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/29/Pune--India---February-19--2024--Apple-i.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.576289"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.266143"
                }
            ],
            "overall_sentiment_score": 0.215195,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.156461",
                    "ticker_sentiment_score": "0.178361",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.885652",
                    "ticker_sentiment_score": "0.354902",
                    "ticker_sentiment_label": "Bullish"
                }
            ]
        },
        {
            "title": "Satya Nadella Touts Copilot Mode In Edge, Can Microsoft Finally Leverage AI To Snag Browser Dominance From Google Chrome? - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46678233/satya-nadella-touts-copilot-mode-in-edge-can-microsoft-finally-leverage-ai-to-snag-browser-dominance",
            "time_published": "20250729T034154",
            "authors": [
                "Ananya Gairola"
            ],
            "summary": "Microsoft Corporation MSFT has started testing a new experimental Copilot Mode in its Edge browser. What Happened: On Monday, Microsoft rolled out Copilot Mode in Edge, a feature designed to allow its AI assistant to analyze all open tabs, summarize content, compare options and even complete ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/28/Microsoft-Copilot-Artificial-Intelligenc.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.316726"
                }
            ],
            "overall_sentiment_score": 0.117505,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.614697",
                    "ticker_sentiment_score": "0.190782",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "SSNLF",
                    "relevance_score": "0.076847",
                    "ticker_sentiment_score": "0.062682",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.152983",
                    "ticker_sentiment_score": "-0.116816",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.152983",
                    "ticker_sentiment_score": "0.079443",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Alphabet's Legal Woes May Create Buying Opportunity: Analyst - Alphabet  ( NASDAQ:GOOGL ) ",
            "url": "https://www.benzinga.com/analyst-stock-ratings/reiteration/25/07/46668574/alphabets-legal-woes-may-create-buying-opportunity-analyst",
            "time_published": "20250728T173126",
            "authors": [
                "Anusuya Lahiri"
            ],
            "summary": "Analyst sees Alphabet as a top long-term AI and cloud play despite looming antitrust ruling due by August 8. JP Morgan expects 2026 EPS hit of 5-10% but still backs $232 target, citing strong Q2, resilient ads, and cloud acceleration. The market's back, and these 3 income stocks are thriving.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/28/Alphabet-Inc.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.658903"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.977154"
                }
            ],
            "overall_sentiment_score": 0.138799,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.087663",
                    "ticker_sentiment_score": "0.049392",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.21686",
                    "ticker_sentiment_score": "0.062547",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.087663",
                    "ticker_sentiment_score": "0.087643",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Market Direction Depends On Amazon, Meta, Microsoft, And Apple Clearing The High Bar",
            "url": "https://www.benzinga.com/markets/equities/25/07/46665134/market-direction-depends-on-amazon-meta-microsoft-and-apple-clearing-the-high-bar",
            "time_published": "20250728T154926",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of Microsoft Corp ( MSFT ) . Microsoft and Meta Platforms Inc ( META ) report earnings on Wednesday after the regular session close.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.986714"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.451494"
                }
            ],
            "overall_sentiment_score": 0.214704,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.295155",
                    "ticker_sentiment_score": "0.25899",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.120431",
                    "ticker_sentiment_score": "0.160277",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.179788",
                    "ticker_sentiment_score": "0.094214",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.120431",
                    "ticker_sentiment_score": "0.160277",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.238133",
                    "ticker_sentiment_score": "0.2051",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.120431",
                    "ticker_sentiment_score": "0.160277",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.060388",
                    "ticker_sentiment_score": "0.30732",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.179788",
                    "ticker_sentiment_score": "0.16583",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Parallels Recognized as a Major Player in the Inaugural IDC MarketScape for Worldwide AI-Enabled Application Streaming and Enterprise Browsers",
            "url": "https://www.benzinga.com/pressreleases/25/07/g46657928/parallels-recognized-as-a-major-player-in-the-inaugural-idc-marketscape-for-worldwide-ai-enabled-a",
            "time_published": "20250728T130043",
            "authors": [
                "Globe Newswire"
            ],
            "summary": "AUSTIN, Texas, July 28, 2025 ( GLOBE NEWSWIRE ) -- Parallels, a global leader in virtualization and end-user computing ( EUC ) solutions, today announced it has been named a Major Player in the IDC MarketScape for Worldwide AI-Enabled Application Streaming and Enterprise Browsers 2025 ( doc ...",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "General",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.495866"
                }
            ],
            "overall_sentiment_score": 0.200192,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.055881",
                    "ticker_sentiment_score": "0.1269",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.055881",
                    "ticker_sentiment_score": "0.1269",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Microsoft, Meta Platforms, Apple, Amazon, Alphabet and Nvidia are part of Zacks Earnings Preview",
            "url": "https://www.zacks.com/stock/news/2628549/microsoft-meta-platforms-apple-amazon-alphabet-and-nvidia-are-part-of-zacks-earnings-preview",
            "time_published": "20250728T121200",
            "authors": [
                "Zacks Equity Research"
            ],
            "summary": "MSFT, META, AAPL, and AMZN earnings this week will test Mag 7's AI momentum and justify their market leadership.",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/80/115230.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.684621"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.999974"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.198501,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.300854",
                    "ticker_sentiment_score": "0.232596",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.115232",
                    "ticker_sentiment_score": "0.206773",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.115232",
                    "ticker_sentiment_score": "0.069453",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.115232",
                    "ticker_sentiment_score": "0.073953",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.228073",
                    "ticker_sentiment_score": "0.156535",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.03853",
                    "ticker_sentiment_score": "0.036368",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.300854",
                    "ticker_sentiment_score": "0.243738",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Mark Zuckerberg's Meta Shuts Down EU Political Ads On Facebook, Instagram, WhatsApp - Calls New Rules 'Unworkable' - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46654484/mark-zuckerbergs-meta-shuts-down-eu-political-ads-on-facebook-instagram-whatsapp-calls-new-rules-unw",
            "time_published": "20250728T094731",
            "authors": [
                "Namrata Sen"
            ],
            "summary": "Meta Platforms Inc. META has announced a ban on political, electoral, and social issue advertising in the European Union ( EU ) due to the \"unworkable requirements\" of the new rules.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/28/Deauville--France---May-26--2011--Facebo.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.214378"
                }
            ],
            "overall_sentiment_score": -0.026532,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.173333",
                    "ticker_sentiment_score": "-0.031734",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.415927",
                    "ticker_sentiment_score": "-0.248741",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.173333",
                    "ticker_sentiment_score": "0.044928",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "FOREX:EUR",
                    "relevance_score": "0.087185",
                    "ticker_sentiment_score": "-0.091446",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Altman Compares AI Benchmark Hype To The Intel-AMD Megahertz Race - Says It's Time To Think Like Apple - Apple  ( NASDAQ:AAPL ) , Advanced Micro Devices  ( NASDAQ:AMD ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46653274/altman-compares-ai-benchmark-hype-to-the-intel-amd-megahertz-race-says-its-time-to-think-like-apple",
            "time_published": "20250728T073427",
            "authors": [
                "Ananya Gairola"
            ],
            "summary": "OpenAI CEO Sam Altman has spoken about the AI industry's obsession with benchmarks being outdated - likening it to the processor wars between Intel Corporation INTC and Advanced Micro Devices Inc. AMD - and argues it's time to focus on real-world impact, just like Apple Inc. AAPL did.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/28/Brooklyn--Ny--Usa--11-22-20-Sam-Altman-A.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.161647"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.06857,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "AMD",
                    "relevance_score": "0.224903",
                    "ticker_sentiment_score": "-0.092415",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.296761",
                    "ticker_sentiment_score": "0.002144",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.151064",
                    "ticker_sentiment_score": "0.043134",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.224903",
                    "ticker_sentiment_score": "-0.147797",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "INTC",
                    "relevance_score": "0.224903",
                    "ticker_sentiment_score": "-0.092415",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Consumer Tech News  ( July 21-July 25 ) : Big Tech Earnings, Pony AI Robotaxi, Tesla Discounts And More - Apple  ( NASDAQ:AAPL ) , Amazon.com  ( NASDAQ:AMZN ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46649870/consumer-tech-news-july-21-july-25-alphabet-tesla-ibm-gm-intel-lead-earnings-parade-as-us-secures-gl",
            "time_published": "20250727T131619",
            "authors": [
                "Nabaparna Bhattacharya"
            ],
            "summary": "U.S. sealed major trade deals with Japan, Indonesia, and the Philippines, boosting market confidence and investment outlook. Alphabet, IBM, GM, and SAP beat earnings estimates, while Tesla and Intel missed amid sector-specific headwinds.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/27/Technology-Laboratory-With-Desktop-Compu.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "General",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.459462"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Real Estate & Construction",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.25"
                }
            ],
            "overall_sentiment_score": 0.193509,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "BABA",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.272859",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.129342",
                    "ticker_sentiment_score": "0.003705",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.032469",
                    "ticker_sentiment_score": "0.07418",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "-0.04391",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "VMW",
                    "relevance_score": "0.032469",
                    "ticker_sentiment_score": "0.111651",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "-0.110105",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AVGO",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.115855",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "SAP",
                    "relevance_score": "0.097193",
                    "ticker_sentiment_score": "-0.053656",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GM",
                    "relevance_score": "0.097193",
                    "ticker_sentiment_score": "-0.064286",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AN",
                    "relevance_score": "0.032469",
                    "ticker_sentiment_score": "0.035731",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "PONY",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.160278",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "-0.050368",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TMUS",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.047032",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "LCID",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.172323",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "LMT",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.00804",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.19295",
                    "ticker_sentiment_score": "0.087696",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "IBM",
                    "relevance_score": "0.097193",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "INTC",
                    "relevance_score": "0.097193",
                    "ticker_sentiment_score": "-0.095641",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "SZIHF",
                    "relevance_score": "0.032469",
                    "ticker_sentiment_score": "0.152413",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "UBER",
                    "relevance_score": "0.064885",
                    "ticker_sentiment_score": "0.172323",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Mag 7 Earnings Loom: What Can Investors Expect?",
            "url": "https://www.zacks.com/commentary/2619170/mag-7-earnings-loom-what-can-investors-expect",
            "time_published": "20250725T230700",
            "authors": [
                "Sheraz Mian"
            ],
            "summary": "The Mag 7 stocks have led the market's rebound from the April lows to new all-time highs, with this week's results giving market participants the most relevant pulse check to validate the group's recent performance.",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/fd/423.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.165933,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.284053",
                    "ticker_sentiment_score": "0.220023",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.096542",
                    "ticker_sentiment_score": "0.193602",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.064449",
                    "ticker_sentiment_score": "0.118129",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.222838",
                    "ticker_sentiment_score": "0.145018",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.032251",
                    "ticker_sentiment_score": "0.035347",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.284053",
                    "ticker_sentiment_score": "0.220023",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Gold Miner Newmont Shines Amid Rising Government Borrowing And Spending - Newmont  ( NYSE:NEM ) ",
            "url": "https://www.benzinga.com/government/25/07/46637186/gold-miner-newmont-shines-amid-rising-government-borrowing-and-spending",
            "time_published": "20250725T161919",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of gold miner Newmont Corporation NEM. Durable goods came at -9.3% vs. -11% consensus. Durable goods ex-transportation came at 0.2% vs. -0.2% consensus.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.998947"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Energy & Transportation",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.25"
                }
            ],
            "overall_sentiment_score": 0.252932,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "0.134259",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "0.134259",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "0.134259",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "-0.308563",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "0.134259",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "0.134259",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NEM",
                    "relevance_score": "0.121037",
                    "ticker_sentiment_score": "0.343925",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.060694",
                    "ticker_sentiment_score": "0.216107",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "CRYPTO:BTC",
                    "relevance_score": "0.060694",
                    "ticker_sentiment_score": "-0.113519",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "CRYPTO:NEM",
                    "relevance_score": "0.060694",
                    "ticker_sentiment_score": "0.301337",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "Apple Faces Existential Threat If It Fails To Act On GenAI - Apple  ( NASDAQ:AAPL ) , Amazon.com  ( NASDAQ:AMZN ) ",
            "url": "https://www.benzinga.com/analyst-stock-ratings/reiteration/25/07/46636565/apple-faces-existential-threat-if-it-fails-to-act-on-genai",
            "time_published": "20250725T160323",
            "authors": [
                "Anusuya Lahiri"
            ],
            "summary": "Analyst warns Apple risks falling further behind as it delays a GenAI roadmap; stock down 14% YTD vs. S&P up 8%. Apple may face rising costs to catch up in GenAI, with possible $30B-$50B CapEx jump and risk of losing top AI talent. Up Next: Get 5 Dark Horse Stocks Wall Street Is Quietly Loading ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/25/Apple-Inc-.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Earnings",
                    "relevance_score": "0.98396"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.54554"
                }
            ],
            "overall_sentiment_score": 0.029054,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.12969",
                    "ticker_sentiment_score": "0.008646",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.097457",
                    "ticker_sentiment_score": "0.088761",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.746902",
                    "ticker_sentiment_score": "-0.007964",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Samsung In Talks With OpenAI And Perplexity AI For Galaxy S26 - Samsung Electronics Co  ( OTC:SSNLF ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46625455/samsung-in-talks-with-openai-and-perplexity-ai-for-galaxy-s26",
            "time_published": "20250725T094207",
            "authors": [
                "Anusuya Lahiri"
            ],
            "summary": "Samsung eyes OpenAI and Perplexity to expand Galaxy S26 AI features, moving beyond Google's Gemini reliance. As Apple readies a foldable iPhone, Samsung plans more AI options and weighs Qualcomm vs. Exynos chips for its next flagship. Up Next: Get 5 Dark Horse Stocks Wall Street Is Quietly ...",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/25/Ho-Chi-Minh-City--Vietnam---June-4--2023.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.214378"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.207403,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "SSNLF",
                    "relevance_score": "0.57127",
                    "ticker_sentiment_score": "0.300388",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.057352",
                    "ticker_sentiment_score": "0.205",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.334008",
                    "ticker_sentiment_score": "0.244655",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "XIACY",
                    "relevance_score": "0.170878",
                    "ticker_sentiment_score": "0.057619",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "QCOM",
                    "relevance_score": "0.170878",
                    "ticker_sentiment_score": "-0.018205",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "The Zacks Analyst Blog Highlights NVIDIA, D-Wave Quantum, Lockheed Martin, Apple, Microsoft and Alphabet",
            "url": "https://www.zacks.com/stock/news/2616063/the-zacks-analyst-blog-highlights-nvidia-d-wave-quantum-lockheed-martin-apple-microsoft-and-alphabet",
            "time_published": "20250725T082000",
            "authors": [
                "Zacks Equity Research"
            ],
            "summary": "NVDA and QBTS both show strong gains, but diverge on risk and maturity as AI and quantum computing reshape tech investing.",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/93/534.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.962106"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.795202"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.266442,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.201105",
                    "ticker_sentiment_score": "0.105705",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.101367",
                    "ticker_sentiment_score": "0.043865",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.433523",
                    "ticker_sentiment_score": "0.324314",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.151539",
                    "ticker_sentiment_score": "0.074849",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "LMT",
                    "relevance_score": "0.151539",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "QBTS",
                    "relevance_score": "0.55533",
                    "ticker_sentiment_score": "0.355365",
                    "ticker_sentiment_label": "Bullish"
                }
            ]
        },
        {
            "title": "4 No-Brainer Artificial Intelligence  ( AI )  Stocks to Buy Right Now",
            "url": "https://www.fool.com/investing/2025/07/25/no-brainer-artificial-intelligence-ai-stocks/",
            "time_published": "20250725T073600",
            "authors": [
                "Lyle Daly"
            ],
            "summary": "Artificial intelligence ( AI ) stocks have been delivering incredible gains to investors. And with so many companies using AI technology, there's no shortage of investment opportunities.While businesses involving new technology can be volatile, you don't need to take on outsized risk to get AI ...",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F824502%2Fnvidia-headquarters-with-grey-nvidia-sign-in-front-with-nvidia-logo.png&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.796627"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.999966"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.303626,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.214462",
                    "ticker_sentiment_score": "0.147347",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.316846",
                    "ticker_sentiment_score": "0.249616",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.054236",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "QCOM",
                    "relevance_score": "0.054236",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMD",
                    "relevance_score": "0.054236",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.366061",
                    "ticker_sentiment_score": "0.29195",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "TSM",
                    "relevance_score": "0.108222",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "D-Wave Quantum or NVIDIA: Which Stock Is a Better Buy Now?",
            "url": "https://www.zacks.com/stock/news/2613805/d-wave-quantum-or-nvidia-which-stock-is-a-better-buy-now",
            "time_published": "20250724T190000",
            "authors": [
                "Tirthankar Chakraborty"
            ],
            "summary": "QBTS surged 141.7% YTD, outpacing NVDA, as quantum gains traction - but is it the smarter buy amid AI's dominance?",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/eb/88097.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.962106"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.928769"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.276031,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.152499",
                    "ticker_sentiment_score": "0.124497",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.051111",
                    "ticker_sentiment_score": "0.085844",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.436009",
                    "ticker_sentiment_score": "0.334906",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.102013",
                    "ticker_sentiment_score": "0.109633",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "LMT",
                    "relevance_score": "0.102013",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "QBTS",
                    "relevance_score": "0.558244",
                    "ticker_sentiment_score": "0.420749",
                    "ticker_sentiment_label": "Bullish"
                }
            ]
        },
        {
            "title": "UK Regulators Pressure Apple, Google For Major Changes To App Stores Amid Monopoly Concerns - Alphabet  ( NASDAQ:GOOG ) , Apple  ( NASDAQ:AAPL ) ",
            "url": "https://www.benzinga.com/markets/tech/25/07/46571811/apple-google-face-sweeping-uk-antitrust-crackdown-as-competition-regulator-targets-strategic-market-",
            "time_published": "20250723T134056",
            "authors": [
                "Namrata Sen"
            ],
            "summary": "The U.K.'s Competition and Markets Authority ( CMA ) is proposing significant changes to the mobile ecosystems of Apple Inc. AAPL and Google, a subsidiary of Alphabet Inc. GOOGL GOOG, following an investigation into their market dominance.",
            "banner_image": "https://cdn.benzinga.com/files/images/story/2025/07/23/Kumamoto--Japan---May-7-2020--Close-Up-O.jpeg?width=1200&height=800&fit=crop",
            "source": "Benzinga",
            "category_within_source": "News",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.161647"
                }
            ],
            "overall_sentiment_score": 0.102604,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.570165",
                    "ticker_sentiment_score": "0.195107",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.633079",
                    "ticker_sentiment_score": "0.047578",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Trading SPY, And Top Tech Stocks Using Technical Analysis",
            "url": "https://www.benzinga.com/markets/equities/25/07/46571139/trading-spy-and-top-tech-stocks-today-using-technical-analysis",
            "time_published": "20250723T132035",
            "authors": [
                "RIPS"
            ],
            "summary": "Good Morning Traders! In today's Market Clubhouse Morning Memo, we will discuss SPY, QQQ, AAPL, MSFT, NVDA, GOOGL, META, and TSLA. Our proprietary formula, exclusive to Market Clubhouse, dictates these price levels. This dynamic equation takes into account price, volume, and options flow.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Economy - Fiscal",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999999"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.495866"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.091764,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.091046",
                    "ticker_sentiment_score": "0.176118",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.030408",
                    "ticker_sentiment_score": "0.074478",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.151159",
                    "ticker_sentiment_score": "-0.023336",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.12119",
                    "ticker_sentiment_score": "0.003679",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.180911",
                    "ticker_sentiment_score": "0.023175",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "If I Could Only Buy and Hold a Single Stock, This Would Be It",
            "url": "https://www.fool.com/investing/2025/07/23/if-i-could-only-buy-and-hold-a-single-stock/",
            "time_published": "20250723T100900",
            "authors": [
                "Anders Bylund"
            ],
            "summary": "What if you could only own one stock for the rest of your life? This giant checks all the boxes for forever ownership.",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F826011%2Fcelebrating-shared-smartphone-screen-1325467196.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.54554"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.310843"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Blockchain",
                    "relevance_score": "0.158519"
                }
            ],
            "overall_sentiment_score": 0.147554,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "NFLX",
                    "relevance_score": "0.301933",
                    "ticker_sentiment_score": "0.187878",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.253514",
                    "ticker_sentiment_score": "0.071494",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.204072",
                    "ticker_sentiment_score": "0.122459",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.204072",
                    "ticker_sentiment_score": "0.098549",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "CRYPTO:BTC",
                    "relevance_score": "0.253514",
                    "ticker_sentiment_score": "0.143525",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "GOOGL Earnings: The Cheapest of the Magnificent 7",
            "url": "https://www.zacks.com/commentary/2604261/googl-earnings-the-cheapest-of-the-magnificent-7",
            "time_published": "20250722T183000",
            "authors": [
                "Ethan Feller"
            ],
            "summary": "Alphabet stock is undervalued and underappreciated heading into earnings ...",
            "banner_image": "https://staticx-tuner.zacks.com/images/articles/main/76/52401.jpg",
            "source": "Zacks Commentary",
            "category_within_source": "n/a",
            "source_domain": "www.zacks.com",
            "topics": [
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.108179"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.994953"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.168933,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.227859",
                    "ticker_sentiment_score": "0.092444",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NFLX",
                    "relevance_score": "0.046184",
                    "ticker_sentiment_score": "0.142045",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.475918",
                    "ticker_sentiment_score": "0.242233",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.092213",
                    "ticker_sentiment_score": "0.073271",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.092213",
                    "ticker_sentiment_score": "0.073271",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.092213",
                    "ticker_sentiment_score": "0.073271",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.092213",
                    "ticker_sentiment_score": "0.073271",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.183198",
                    "ticker_sentiment_score": "0.08366",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "Momo Crowd Behavior Triggers A Yellow Flag For Market, Tariffs Cost GM $1.1B - Opendoor Technologies  ( NASDAQ:OPEN ) ",
            "url": "https://www.benzinga.com/general/market-summary/25/07/46552763/momo-crowd-behavior-triggers-a-yellow-flag-for-stock-market-tariffs-cost-gm-1-1b",
            "time_published": "20250722T170101",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for a chart of Opendoor Technologies Inc OPEN. This article is about the big picture, not an individual stock. The chart of OPEN stock is being used to illustrate the point. The chart shows an aggressive move up in OPEN stock.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.310843"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "1.0"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.25"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Real Estate & Construction",
                    "relevance_score": "0.25"
                }
            ],
            "overall_sentiment_score": 0.105946,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.07446",
                    "ticker_sentiment_score": "0.0",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.07446",
                    "ticker_sentiment_score": "0.127218",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.07446",
                    "ticker_sentiment_score": "0.127218",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.07446",
                    "ticker_sentiment_score": "-0.27359",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.07446",
                    "ticker_sentiment_score": "0.127218",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.07446",
                    "ticker_sentiment_score": "0.127218",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GM",
                    "relevance_score": "0.148273",
                    "ticker_sentiment_score": "-0.128647",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.037271",
                    "ticker_sentiment_score": "0.210488",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "OPEN",
                    "relevance_score": "0.25641",
                    "ticker_sentiment_score": "0.009732",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "How To Trade SPY, Top Tech Stocks Today Using Technical Analysis",
            "url": "https://www.benzinga.com/markets/equities/25/07/46543210/how-to-trade-spy-top-tech-stocks-today-using-technical-analysis",
            "time_published": "20250722T130136",
            "authors": [
                "RIPS"
            ],
            "summary": "Good Morning Traders! In today's Market Clubhouse Morning Memo, we will discuss SPY, QQQ, AAPL, MSFT, NVDA, GOOGL, META, and TSLA. Our proprietary formula, exclusive to Market Clubhouse, dictates these price levels. This dynamic equation takes into account price, volume, and options flow.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999998"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.071979,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.088147",
                    "ticker_sentiment_score": "0.174965",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.029436",
                    "ticker_sentiment_score": "0.074146",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.14638",
                    "ticker_sentiment_score": "-0.022868",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.117343",
                    "ticker_sentiment_score": "0.003621",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.117343",
                    "ticker_sentiment_score": "0.034891",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "2 Warren Buffett Stocks to Buy Hand Over Fist -- and 1 to Avoid",
            "url": "https://www.fool.com/investing/2025/07/22/2-warren-buffett-stocks-to-buy-hand-over-fist-and/",
            "time_published": "20250722T071700",
            "authors": [
                "Patrick Sanders"
            ],
            "summary": "Legendary investor Warren Buffett's track record can stand up to anyone's. The Oracle of Omaha is one of the best value investors in the world, using a simple investing philosophy of choosing well-established companies that are leaders in their field and have strong management, earnings, and a ...",
            "banner_image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F825767%2Fbuffett5-tmf.jpg&op=resize&w=700",
            "source": "Motley Fool",
            "category_within_source": "n/a",
            "source_domain": "www.fool.com",
            "topics": [
                {
                    "topic": "Retail & Wholesale",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.905476"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.961735"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.306507,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "BABA",
                    "relevance_score": "0.096477",
                    "ticker_sentiment_score": "0.090483",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.048327",
                    "ticker_sentiment_score": "0.084793",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.048327",
                    "ticker_sentiment_score": "0.084793",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.328611",
                    "ticker_sentiment_score": "0.405876",
                    "ticker_sentiment_label": "Bullish"
                },
                {
                    "ticker": "AMZN",
                    "relevance_score": "0.372216",
                    "ticker_sentiment_score": "0.310255",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "BRK-A",
                    "relevance_score": "0.144275",
                    "ticker_sentiment_score": "0.131932",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        },
        {
            "title": "88% Of Companies Beat Consensus; Earnings From Alphabet, Tesla, And Intel Ahead; Japan Problem - Alphabet  ( NASDAQ:GOOG ) , Alphabet  ( NASDAQ:GOOGL ) ",
            "url": "https://www.benzinga.com/markets/equities/25/07/46525767/88-of-companies-beat-consensus-earnings-from-alphabet-tesla-and-intel-ahead-japan-problem",
            "time_published": "20250721T162908",
            "authors": [
                "The Arora Report"
            ],
            "summary": "To gain an edge, this is what you need to know today. Please click here for an enlarged chart of Alphabet Inc GOOG, GOOGL. Alphabet earnings will impact the sentiment on about 40% of S&P 500 capitalization. Alphabet's earnings are a proxy for digital advertising, due to the dominance of Google ...",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Economy - Monetary",
                    "relevance_score": "0.158519"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.998947"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Earnings",
                    "relevance_score": "0.495866"
                },
                {
                    "topic": "Technology",
                    "relevance_score": "0.333333"
                },
                {
                    "topic": "Finance",
                    "relevance_score": "0.333333"
                }
            ],
            "overall_sentiment_score": 0.200097,
            "overall_sentiment_label": "Somewhat-Bullish",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.102449",
                    "ticker_sentiment_score": "-0.29096",
                    "ticker_sentiment_label": "Somewhat-Bearish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.521151",
                    "ticker_sentiment_score": "0.079275",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "META",
                    "relevance_score": "0.102449",
                    "ticker_sentiment_score": "0.12641",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.102449",
                    "ticker_sentiment_score": "0.12641",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.102449",
                    "ticker_sentiment_score": "0.12641",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.102449",
                    "ticker_sentiment_score": "0.12641",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "IVZ",
                    "relevance_score": "0.05133",
                    "ticker_sentiment_score": "0.215525",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                }
            ]
        },
        {
            "title": "How To Trade SPY, Top Tech Stocks Using Technical Analysis",
            "url": "https://www.benzinga.com/markets/equities/25/07/46516892/how-to-trade-spy-top-tech-stocks-using-technical-analysis",
            "time_published": "20250721T124351",
            "authors": [
                "RIPS"
            ],
            "summary": "Good Morning Traders! In today's Market Clubhouse Morning Memo, we will discuss SPY, QQQ, AAPL, MSFT, NVDA, GOOGL, META, and TSLA. Our proprietary formula, exclusive to Market Clubhouse, dictates these price levels. This dynamic equation takes into account price, volume, and options flow.",
            "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
            "source": "Benzinga",
            "category_within_source": "Trading",
            "source_domain": "www.benzinga.com",
            "topics": [
                {
                    "topic": "Technology",
                    "relevance_score": "0.5"
                },
                {
                    "topic": "Financial Markets",
                    "relevance_score": "0.999998"
                },
                {
                    "topic": "Manufacturing",
                    "relevance_score": "0.5"
                }
            ],
            "overall_sentiment_score": 0.064774,
            "overall_sentiment_label": "Neutral",
            "ticker_sentiment": [
                {
                    "ticker": "MSFT",
                    "relevance_score": "0.093168",
                    "ticker_sentiment_score": "0.177019",
                    "ticker_sentiment_label": "Somewhat-Bullish"
                },
                {
                    "ticker": "GOOG",
                    "relevance_score": "0.031119",
                    "ticker_sentiment_score": "0.074714",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "NVDA",
                    "relevance_score": "0.154653",
                    "ticker_sentiment_score": "-0.023683",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "AAPL",
                    "relevance_score": "0.124004",
                    "ticker_sentiment_score": "0.003723",
                    "ticker_sentiment_label": "Neutral"
                },
                {
                    "ticker": "TSLA",
                    "relevance_score": "0.124004",
                    "ticker_sentiment_score": "0.03586",
                    "ticker_sentiment_label": "Neutral"
                }
            ]
        }
    ]
}