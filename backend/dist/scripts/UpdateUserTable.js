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
exports.UpdateUserTable1729516800002 = void 0;
class UpdateUserTable1729516800002 {
    constructor() {
        this.name = 'UpdateUserTable1729516800002';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "user"
      ADD id SERIAL
    `);
            yield queryRunner.query(`
      UPDATE "user"
      SET id = nextval('user_id_seq')
      WHERE id IS NULL
    `);
            yield queryRunner.query(`
      ALTER TABLE "user"
      ADD CONSTRAINT user_pkey PRIMARY KEY (id)
    `);
            yield queryRunner.query(`
      ALTER TABLE profiles
      DROP CONSTRAINT profiles_user_id_fkey,
      ALTER COLUMN user_id TYPE INTEGER,
      ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id)
    `);
            yield queryRunner.query(`
      UPDATE profiles
      SET user_id = (SELECT id FROM "user" WHERE _id = profiles.user_id::VARCHAR)
      WHERE EXISTS (SELECT 1 FROM "user" WHERE _id = profiles.user_id::VARCHAR)
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE profiles
      DROP CONSTRAINT profiles_user_id_fkey,
      ALTER COLUMN user_id TYPE VARCHAR,
      ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(_id)
    `);
            yield queryRunner.query(`
      ALTER TABLE "user"
      DROP CONSTRAINT user_pkey,
      DROP COLUMN id
    `);
        });
    }
}
exports.UpdateUserTable1729516800002 = UpdateUserTable1729516800002;
