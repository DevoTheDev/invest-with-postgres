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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/apiKey.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const data_source_1 = require("../../data-source");
const Secret_1 = require("../../entities/Secret");
const router = express_1.default.Router();
const secretRepository = data_source_1.AppDataSource.getRepository(Secret_1.Secret);
const getSecretKey = (key_name, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyRecord = yield secretRepository.findOne({ where: { key_name } });
        if (!keyRecord) {
            return res.status(404).json({ error: "API key not found" });
        }
        return res.json({ apiKey: keyRecord.key_value });
    }
    catch (error) {
        console.error(`Error fetching ${key_name}:`, error);
        return res.status(500).json({ error: "Server error" });
    }
});
router.get("/alpha-vantage", authMiddleware_1.authMiddleware, (req, res) => getSecretKey("alpha_vantage_key", res));
router.get("/polygon-io", authMiddleware_1.authMiddleware, (req, res) => getSecretKey("polygon_io_key", res));
router.get("/news-api-key", authMiddleware_1.authMiddleware, (req, res) => getSecretKey("news_api_key", res));
router.get("/open-ai-key", authMiddleware_1.authMiddleware, (req, res) => getSecretKey("open_ai_key", res));
router.get("/jwt-secret", authMiddleware_1.authMiddleware, (req, res) => getSecretKey("jwt_secret", res));
exports.default = router;
