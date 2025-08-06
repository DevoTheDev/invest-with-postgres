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
exports.InvestorDTO = void 0;
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../../data-source");
const Investor_1 = require("../../entities/Investor-Entities/Investor");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const clarity_1 = require("../../utils/clarity");
const router = express_1.default.Router();
const investorRepository = data_source_1.AppDataSource.getRepository(Investor_1.Investor);
class InvestorDTO {
}
exports.InvestorDTO = InvestorDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], InvestorDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_2.IsEnum)(Investor_1.InvestmentGoal),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], InvestorDTO.prototype, "investment_goal", void 0);
__decorate([
    (0, class_validator_2.IsEnum)(Investor_1.RiskTolerance),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], InvestorDTO.prototype, "risk_tolerance", void 0);
__decorate([
    (0, class_validator_2.IsEnum)(Investor_1.ExperienceLevel),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], InvestorDTO.prototype, "experience_level", void 0);
__decorate([
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Number)
], InvestorDTO.prototype, "annual_investment_budget", void 0);
__decorate([
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Boolean)
], InvestorDTO.prototype, "auto_invest_enabled", void 0);
// Get Investor
const getInvestor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const investor = yield investorRepository.findOne({
            where: { user_id: userId },
        });
        if (!investor) {
            (0, clarity_1.clarity)(`Investor not found for user_id:`, userId);
            res.status(404).json({ message: 'Investor not found' });
            return;
        }
        (0, clarity_1.clarity)(`Investor retrieved for user_id: ${userId}`, investor);
        res.status(200).json({ message: 'Investor retrieved', data: { investor } });
    }
    catch (error) {
        (0, clarity_1.clarity)(`Error fetching investor: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update Investor
const updateInvestor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const userId = req.user.id;
        const investor = yield investorRepository.findOne({ where: { user_id: userId } });
        if (!investor) {
            (0, clarity_1.clarity)(`Investor not found for user_id:`, userId);
            res.status(404).json({ message: 'Investor not found' });
            return;
        }
        (0, clarity_1.clarity)(`Investor before UPDATE for user_id: ${userId}`, investor);
        investorRepository.merge(investor, {
            investment_goal: (_a = req.body.investment_goal) !== null && _a !== void 0 ? _a : investor.investment_goal,
            risk_tolerance: (_b = req.body.risk_tolerance) !== null && _b !== void 0 ? _b : investor.risk_tolerance,
            experience_level: (_c = req.body.experience_level) !== null && _c !== void 0 ? _c : investor.experience_level,
            annual_investment_budget: (_d = req.body.annual_investment_budget) !== null && _d !== void 0 ? _d : investor.annual_investment_budget,
            auto_invest_enabled: (_e = req.body.auto_invest_enabled) !== null && _e !== void 0 ? _e : investor.auto_invest_enabled,
        });
        const updatedInvestor = yield investorRepository.save(investor);
        (0, clarity_1.clarity)(`Investor updated for user_id: ${userId}`, updatedInvestor);
        res.status(200).json({ message: 'Investor updated', data: { updatedInvestor } });
    }
    catch (error) {
        (0, clarity_1.clarity)(`Error updating investor: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/', authMiddleware_1.authMiddleware, getInvestor);
router.put('/', authMiddleware_1.authMiddleware, updateInvestor);
exports.default = router;
