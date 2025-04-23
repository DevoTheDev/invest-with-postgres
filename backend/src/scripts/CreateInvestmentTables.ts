import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvestmentTables1729516800000 implements MigrationInterface {
  name = 'CreateInvestmentTables1729516800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE investors (
        user_id INTEGER PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES "user"(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE watchlists (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        investor_id INTEGER NOT NULL,
        FOREIGN KEY (investor_id) REFERENCES investors(user_id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE watchlist_tickers (
        id SERIAL PRIMARY KEY,
        ticker VARCHAR(10) NOT NULL,
        watchlist_id INTEGER NOT NULL,
        FOREIGN KEY (watchlist_id) REFERENCES watchlists(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE investments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        ticker VARCHAR(10) NOT NULL,
        shares INTEGER NOT NULL,
        purchasePrice NUMERIC(10,2) NOT NULL,
        lastInvestmentAdjustment TIMESTAMP NOT NULL,
        investor_id INTEGER NOT NULL,
        FOREIGN KEY (investor_id) REFERENCES investors(user_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE investments`);
    await queryRunner.query(`DROP TABLE watchlist_tickers`);
    await queryRunner.query(`DROP TABLE watchlists`);
    await queryRunner.query(`DROP TABLE investors`);
  }
}