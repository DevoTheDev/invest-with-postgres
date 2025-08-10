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
// src/seeds/seed.ts
const data_source_1 = require("../data-source");
const Secret_1 = require("../entities/Secret");
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
    const secrets = [
        {
            key_name: 'jwt_secret',
            key_value: 'your-super-secret-key',
        },
        {
            key_name: 'alpha_vantage_key',
            key_value: 'PL8HXL9DJH4ZSCQU',
        },
        {
            key_name: 'polygon_io_key',
            key_value: 'PV52UC0UkhnXU0ihkvi27Bdu_YctpZeB',
        },
    ];
    for (const s of secrets) {
        const existing = yield data_source_1.AppDataSource.manager.findOne(Secret_1.Secret, {
            where: { key_name: s.key_name },
        });
        if (!existing) {
            const secret = new Secret_1.Secret();
            secret.key_name = s.key_name;
            secret.key_value = s.key_value;
            yield data_source_1.AppDataSource.manager.save(secret);
            console.log(`✅ Seeded ${s.key_name}`);
        }
        else {
            console.log(`⚠️  ${s.key_name} already exists`);
        }
    }
    process.exit();
});
seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
