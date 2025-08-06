"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.InvestmentDTO = void 0;
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../../data-source");
const Investor_1 = require("../../entities/Investor-Entities/Investor");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const logger_1 = require("../../utils/logger");
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const investorRepository = data_source_1.AppDataSource.getRepository(Investor_1.Investor);
// DTO aligned with Investment type
class InvestmentDTO {
}
exports.InvestmentDTO = InvestmentDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvestmentDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvestmentDTO.prototype, "ticker", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], InvestmentDTO.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], InvestmentDTO.prototype, "purchase_price", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], InvestmentDTO.prototype, "purchase_date", void 0);
// Get All Investments
const getInvestments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.user.id;
        const investor = yield investorRepository.findOne({ where: { user_id: userId } });
        if (!investor) {
            (0, logger_1.logMessage)('info', `Investor not found for user_id: ${userId}`);
            res.status(404).json({ message: 'Investor not found' });
            return;
        }
        (0, logger_1.logMessage)('info', `Investments retrieved for user_id: ${userId}`);
        res.status(200).json({ message: 'Investments retrieved', data: { investments: (_a = investor.investments) !== null && _a !== void 0 ? _a : [] } });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error fetching investments: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Add Investment with duplicate ticker check
const addInvestment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const userId = req.user.id;
        const dto = (0, class_transformer_1.plainToClass)(InvestmentDTO, req.body);
        const errors = yield (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            (0, logger_1.logMessage)('error', 'Validation failed for investment addition');
            res.status(400).json({ message: 'Validation failed', data: { errors } });
            return;
        }
        const investor = yield investorRepository.findOne({ where: { user_id: userId } });
        if (!investor) {
            (0, logger_1.logMessage)('info', `Investor not found for user_id: ${userId}`);
            res.status(404).json({ message: 'Investor not found' });
            return;
        }
        // 🚨 Check for duplicate ticker
        const duplicate = (_a = investor.investments) === null || _a === void 0 ? void 0 : _a.find((investment) => { var _a; return investment.ticker.toLowerCase() === ((_a = dto.ticker) !== null && _a !== void 0 ? _a : '').toLowerCase(); });
        if (duplicate) {
            (0, logger_1.logMessage)('warning', `Duplicate investment ticker '${dto.ticker}' for user_id: ${userId}`);
            res.status(400).json({ message: `Investment with ticker '${dto.ticker}' already exists.` });
            return;
        }
        const newInvestment = {
            id: (_b = dto.id) !== null && _b !== void 0 ? _b : crypto_1.default.randomUUID(),
            ticker: (_c = dto.ticker) !== null && _c !== void 0 ? _c : '',
            quantity: (_d = dto.quantity) !== null && _d !== void 0 ? _d : 0,
            purchase_price: (_e = dto.purchase_price) !== null && _e !== void 0 ? _e : 0,
            purchase_date: (_f = dto.purchase_date) !== null && _f !== void 0 ? _f : new Date(),
        };
        investor.investments = investor.investments ? [...investor.investments, newInvestment] : [newInvestment];
        const updatedInvestor = yield investorRepository.save(investor);
        (0, logger_1.logMessage)('info', `Investment added for user_id: ${userId}`);
        res.status(201).json({ message: 'Investment added', data: { investments: updatedInvestor.investments } });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error adding investment: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update Investment
const updateInvestment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { investmentId } = req.params;
        const dto = (0, class_transformer_1.plainToClass)(InvestmentDTO, req.body);
        const errors = yield (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            (0, logger_1.logMessage)('error', 'Validation failed for investment update');
            res.status(400).json({ message: 'Validation failed', data: { errors } });
            return;
        }
        const investor = yield investorRepository.findOne({ where: { user_id: userId } });
        if (!investor || !investor.investments) {
            (0, logger_1.logMessage)('info', `Investor or investments not found for user_id: ${userId}`);
            res.status(404).json({ message: 'Investor or investments not found' });
            return;
        }
        const investmentIndex = investor.investments.findIndex(inv => inv.id === investmentId);
        if (investmentIndex === -1) {
            (0, logger_1.logMessage)('info', `Investment not found with id: ${investmentId}`);
            res.status(404).json({ message: 'Investment not found' });
            return;
        }
        investor.investments[investmentIndex] = Object.assign(Object.assign({}, investor.investments[investmentIndex]), dto);
        const updatedInvestor = yield investorRepository.save(investor);
        (0, logger_1.logMessage)('info', `Investment updated for user_id: ${userId}, investmentId: ${investmentId}`);
        res.status(200).json({ message: 'Investment updated', data: { investment: updatedInvestor.investments[investmentIndex] } });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error updating investment: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Delete Investment
const deleteInvestment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { investmentId } = req.params;
        const investor = yield investorRepository.findOne({ where: { user_id: userId } });
        if (!investor || !investor.investments) {
            (0, logger_1.logMessage)('info', `Investor or investments not found for user_id: ${userId}`);
            res.status(404).json({ message: 'Investor or investments not found' });
            return;
        }
        const updatedInvestments = investor.investments.filter(inv => inv.id !== investmentId);
        if (updatedInvestments.length === investor.investments.length) {
            (0, logger_1.logMessage)('info', `Investment not found with id: ${investmentId}`);
            res.status(404).json({ message: 'Investment not found' });
            return;
        }
        investor.investments = updatedInvestments;
        const updatedInvestor = yield investorRepository.save(investor);
        (0, logger_1.logMessage)('info', `Investment deleted for user_id: ${userId}, investmentId: ${investmentId}`);
        res.status(200).json({ message: 'Investment deleted', data: { investments: updatedInvestor.investments } });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error deleting investment: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/', authMiddleware_1.authMiddleware, getInvestments);
router.post('/', authMiddleware_1.authMiddleware, addInvestment);
router.put('/:investmentId', authMiddleware_1.authMiddleware, updateInvestment);
router.delete('/:investmentId', authMiddleware_1.authMiddleware, deleteInvestment);
exports.default = router;
