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
// src/scripts/clearUsers.ts
const data_source_1 = require("../data-source");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let dataSourceInitialized = false;
    try {
        yield data_source_1.AppDataSource.initialize();
        dataSourceInitialized = true;
        console.log("🗄️ Database connection established.");
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        yield queryRunner.connect();
        // Truncate all tables with CASCADE to remove data and handle foreign keys
        yield queryRunner.query(`
      TRUNCATE TABLE "watchlist_stocks_stock" CASCADE;
      TRUNCATE TABLE "transaction" CASCADE;
      TRUNCATE TABLE "portfolio_stock" CASCADE;
      TRUNCATE TABLE "watchlist" CASCADE;
      TRUNCATE TABLE "stock" CASCADE;
      TRUNCATE TABLE "portfolio" CASCADE;
      TRUNCATE TABLE "user" CASCADE;
    `);
        // Synchronize schema to ensure it matches entities
        yield data_source_1.AppDataSource.synchronize(true);
        yield queryRunner.release();
        console.log("✅ All tables truncated and schema synchronized.");
    }
    catch (err) {
        console.error("❌ Failed to truncate and synchronize tables:", err);
    }
    finally {
        if (dataSourceInitialized) {
            yield data_source_1.AppDataSource.destroy();
            console.log("🔌 Database connection closed.");
        }
        else {
            console.log("🔌 No connection to close due to initialization failure.");
        }
    }
}))();
// Run this in the terminal : 
// ts-node src/scripts/clearUsers.ts`
