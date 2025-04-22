// src/data-source.ts
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import * as dotenv from "dotenv";
import { Secret } from "./entities/Secret";
import { Profile } from "./entities/Profile";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "devonfennell",
  password: process.env.DB_PASSWORD || "HaHaEmMu20@%",
  database: process.env.DB_NAME || "postgres",
  synchronize: true,
  // dropSchema: true,
  /*
    Setting 'dropSchema' to true and running the 
    server will purge the database of all entries 
    and reset all schema.

      TODO:

      Remove 'dropSchema' from this dataScoure but
      keeping while in early development.

  */ 
  logging: process.env.NODE_ENV === "development",
  entities: [User, Secret, Profile],
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