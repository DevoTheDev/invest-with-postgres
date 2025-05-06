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
exports.CreateInvestmentTables1729516800000 = void 0;
class CreateInvestmentTables1729516800000 {
    constructor() {
        this.name = 'CreateInvestmentTables1729516800000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE TABLE investors (
        user_id INTEGER PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES "user"(id)
      )
    `);
            yield queryRunner.query(`
      CREATE TABLE watchlists (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        investor_id INTEGER NOT NULL,
        FOREIGN KEY (investor_id) REFERENCES investors(user_id)
      )
    `);
            yield queryRunner.query(`
      CREATE TABLE watchlist_tickers (
        id SERIAL PRIMARY KEY,
        ticker VARCHAR(10) NOT NULL,
        watchlist_id INTEGER NOT NULL,
        FOREIGN KEY (watchlist_id) REFERENCES watchlists(id)
      )
    `);
            yield queryRunner.query(`
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
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE investments`);
            yield queryRunner.query(`DROP TABLE watchlist_tickers`);
            yield queryRunner.query(`DROP TABLE watchlists`);
            yield queryRunner.query(`DROP TABLE investors`);
        });
    }
}
exports.CreateInvestmentTables1729516800000 = CreateInvestmentTables1729516800000;
