// src/data-source.ts
import { DataSource } from "typeorm";
import { User } from "./entities/investor-entities/User";
import { Portfolio } from "./entities/investor-entities/Portfolio";
import { PortfolioStock } from "./entities/investor-entities/PortfolioStock";
import { Transaction } from "./entities/investor-entities/Transaction";
import { Watchlist } from "./entities/investor-entities/Watchlist";
import { Stock } from "./entities/investor-entities/Stock";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "devonfennell",
  password: process.env.DB_PASSWORD || "HaHaEmMu20@%",
  database: process.env.DB_NAME || "investment_db",
  synchronize: process.env.NODE_ENV === "development", // True in dev, false in production
  logging: process.env.NODE_ENV === "development",
  entities: [User, Portfolio, PortfolioStock, Transaction, Watchlist, Stock],
  migrations: [],
  subscribers: [],
});

/* 
----------------- NOTE FOR PRODUCTION MODE -------------------

Since synchronize is conditional (true in development), TypeORM will auto-create tables in dev mode. In production (NODE_ENV=production), use migrations:

1. Set NODE_ENV=production in .env or environment.
2. Generate a migration: npx typeorm migration:generate -d src/data-source.ts AddStockEntities
3. Run it: npx typeorm migration:run -d src/data-source.ts

----------------                           -------------------
*/