// src/scripts/clearUsers.ts
import { AppDataSource } from "../data-source";

(async () => {
  let dataSourceInitialized = false;

  try {
    await AppDataSource.initialize();
    dataSourceInitialized = true;
    console.log("🗄️ Database connection established.");

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    // Truncate all tables with CASCADE to remove data and handle foreign keys
    await queryRunner.query(`
      TRUNCATE TABLE "watchlist_stocks_stock" CASCADE;
      TRUNCATE TABLE "transaction" CASCADE;
      TRUNCATE TABLE "portfolio_stock" CASCADE;
      TRUNCATE TABLE "watchlist" CASCADE;
      TRUNCATE TABLE "stock" CASCADE;
      TRUNCATE TABLE "portfolio" CASCADE;
      TRUNCATE TABLE "user" CASCADE;
    `);

    // Synchronize schema to ensure it matches entities
    await AppDataSource.synchronize(true);

    await queryRunner.release();
    console.log("✅ All tables truncated and schema synchronized.");
  } catch (err) {
    console.error("❌ Failed to truncate and synchronize tables:", err);
  } finally {
    if (dataSourceInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Database connection closed.");
    } else {
      console.log("🔌 No connection to close due to initialization failure.");
    }
  }
})();

// Run this in the terminal : 
// ts-node src/scripts/clearUsers.ts`