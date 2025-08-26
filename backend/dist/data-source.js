"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const dotenv = __importStar(require("dotenv"));
const Secret_1 = require("./entities/Secret");
const Profile_1 = require("./entities/Profile");
const Investor_1 = require("./entities/Investor-Entities/Investor");
const Exerciser_1 = require("./entities/Exerciser-Entities/Exerciser");
const Movement_1 = require("./entities/Exerciser-Entities/Movement");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'develement-app-db.xxxxx.us-east-1.rds.amazonaws.com',
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "devonfennell",
    password: process.env.DB_PASSWORD || "HaHaEmMu20@%",
    database: process.env.DB_NAME || "develement_app",
    synchronize: true,
    // dropSchema: true,
    logging: process.env.NODE_ENV === "development",
    entities: [User_1.User, Secret_1.Secret, Profile_1.Profile, Investor_1.Investor, Exerciser_1.Exerciser, Movement_1.Movement],
    migrations: [],
    subscribers: [],
});
/*
    Setting 'dropSchema' to true and running the
    server will purge the database of all entries
    and reset all schema.

      TODO:

      Remove 'dropSchema' from this dataScoure but
      keeping while in early development.

  */
/*
----------------- NOTE FOR PRODUCTION MODE -------------------

Since synchronize is conditional (true in development), TypeORM will auto-create tables in dev mode. In production (NODE_ENV=production), use migrations:

1. Set NODE_ENV=production in .env or environment.
2. Generate a migration: npx typeorm migration:generate -d src/data-source.ts AddStockEntities
3. Run it: npx typeorm migration:run -d src/data-source.ts

----------------                           -------------------
*/
