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
const express_1 = require("express");
const data_source_1 = require("../../data-source");
const Investor_1 = require("../../entities/Investor-Entities/Investor");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
const investorRepo = data_source_1.AppDataSource.getRepository(Investor_1.Investor);
// POST /api/investors
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield data_source_1.AppDataSource.getRepository('User').findOneBy({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingInvestor = yield investorRepo.findOneBy({ user_id: user.id });
        if (existingInvestor) {
            return res.status(400).json({ message: 'Investor already exists for this user' });
        }
        const investor = investorRepo.create({ user_id: user.id });
        yield investorRepo.save(investor);
        return res.status(201).json({ message: 'Investor created', investor });
    }
    catch (error) {
        console.error('Error creating investor:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
// GET /api/investors/:userId
router.get('/:userId', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = yield data_source_1.AppDataSource.getRepository('User').findOneBy({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!user || user.id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You can only access your own investor data' });
        }
        const investor = yield investorRepo.findOne({
            where: { user_id: userId },
            relations: ['watchlists', 'watchlists.tickers', 'investments'],
        });
        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }
        return res.json({ investor });
    }
    catch (error) {
        console.error('Error fetching investor:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
