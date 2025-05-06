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
exports.CreateExerciserTables1729516800001 = void 0;
class CreateExerciserTables1729516800001 {
    constructor() {
        this.name = 'CreateExerciserTables1729516800001';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE TABLE exercisers (
        user_id INTEGER PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES "user"(id)
      )
    `);
            yield queryRunner.query(`
      CREATE TABLE workouts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        date TIMESTAMP NOT NULL,
        exercises TEXT NOT NULL,
        exerciser_id INTEGER NOT NULL,
        FOREIGN KEY (exerciser_id) REFERENCES exercisers(user_id)
      )
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE workouts`);
            yield queryRunner.query(`DROP TABLE exercisers`);
        });
    }
}
exports.CreateExerciserTables1729516800001 = CreateExerciserTables1729516800001;
