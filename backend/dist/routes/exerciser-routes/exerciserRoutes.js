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
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../../data-source");
const Exerciser_1 = require("../../entities/Exerciser-Entities/Exerciser");
const Movement_1 = require("../../entities/Exerciser-Entities/Movement");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const class_validator_1 = require("class-validator");
const logger_1 = require("../../utils/logger");
const clarity_1 = require("../../utils/clarity");
const router = express_1.default.Router();
const exerciserRepository = data_source_1.AppDataSource.getRepository(Exerciser_1.Exerciser);
const movementsRepository = data_source_1.AppDataSource.getRepository(Movement_1.Movement);
class ExerciserDTO {
}
__decorate([
    (0, class_validator_1.IsEnum)(Exerciser_1.TrainingEmphasis),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ExerciserDTO.prototype, "training_emphasis", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ExerciserDTO.prototype, "programs", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExerciserDTO.prototype, "height_cm", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExerciserDTO.prototype, "weight_kg", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExerciserDTO.prototype, "body_fat_percentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExerciserDTO.prototype, "weekly_workout_frequency", void 0);
const getExerciser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const exerciser = yield exerciserRepository.findOne({
            where: { user_id: userId },
        });
        if (!exerciser) {
            (0, logger_1.logMessage)('info', `Exerciser not found for user_id: ${userId}`);
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }
        (0, logger_1.logMessage)('info', `Exerciser retrieved for user_id: ${userId}`);
        res.status(200).json({ message: 'Exerciser retrieved', data: { exerciser } });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error fetching exerciser: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
const updateExerciser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const exerciser = yield exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            (0, clarity_1.clarity)(`Exerciser not found for user_id:,`, userId);
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }
        (0, clarity_1.clarity)("Exerciser before UPDATE", exerciser);
        exerciserRepository.merge(exerciser, req.body);
        const updatedExerciser = yield exerciserRepository.save(exerciser);
        (0, clarity_1.clarity)(`Exerciser updated for user_id: ${userId}`, updatedExerciser);
        res.status(200).json({ message: 'Exerciser updated', data: updatedExerciser });
    }
    catch (error) {
        (0, clarity_1.clarity)(`Error updating exerciser: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
const getMovements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const movements = yield movementsRepository.find();
        (0, logger_1.logMessage)('info', `Retrieved ${movements.length} movements from DB for user_id: ${userId}`);
        res.status(200).json({ message: 'Movements retrieved', data: movements });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error fetching movements: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/', authMiddleware_1.authMiddleware, getExerciser);
router.put('/', authMiddleware_1.authMiddleware, updateExerciser);
router.get('/movements', authMiddleware_1.authMiddleware, getMovements);
exports.default = router;
