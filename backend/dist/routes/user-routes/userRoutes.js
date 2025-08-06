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
exports.errorHandler = errorHandler;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../entities/User");
const Profile_1 = require("../../entities/Profile");
const Exerciser_1 = require("../../entities/Exerciser-Entities/Exerciser");
const Investor_1 = require("../../entities/Investor-Entities/Investor");
const data_source_1 = require("../../data-source");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const uuid_1 = require("uuid");
const GetSecret_1 = require("../../utils/GetSecret");
const logger_1 = require("../../utils/logger");
const shared_types_1 = require("../../types/shared/shared-types");
const Investor_2 = require("../../entities/Investor-Entities/Investor");
const router = express_1.default.Router();
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
function errorHandler(res, error, context = 'Unknown error') {
    (0, logger_1.logMessage)('error', `${context}: ${error.message}`, { stack: error.stack });
    res.status(500).json({
        status: 'error',
        message: `An unexpected error occurred while processing: ${context}`,
        errorType: error.name || 'InternalServerError',
        details: error.details || {},
    });
}
// Register
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        (0, logger_1.logMessage)('info', 'Registration request received', { body: req.body });
        const { email, password } = req.body;
        if (!email || !password) {
            (0, logger_1.logMessage)('error', 'Missing email or password');
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            (0, logger_1.logMessage)('error', `User with email ${email} already exists`);
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const userId = (0, uuid_1.v4)();
        let newUser;
        let newProfile;
        let newExerciser;
        let newInvestor;
        yield data_source_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            // Create User
            newUser = new User_1.User();
            newUser.id = userId;
            newUser.email = email;
            newUser.password = hashedPassword;
            yield transactionalEntityManager.save(newUser);
            (0, logger_1.logMessage)('info', `User created with id: ${newUser.id}`);
            // Create Profile
            newProfile = new Profile_1.Profile();
            newProfile.id = (0, uuid_1.v4)();
            newProfile.user_id = userId;
            newProfile.username = `user_${(0, uuid_1.v4)().substring(0, 8)}`;
            newProfile.name = '';
            newProfile.email = email;
            newProfile.themePreference = shared_types_1.ThemePreference.System;
            newProfile.language = shared_types_1.LanguageOption.En;
            newProfile.notifications = { email: true, push: true };
            newProfile.dataUsage = { backgroundSync: false, activityLogs: false };
            yield transactionalEntityManager.save(newProfile);
            (0, logger_1.logMessage)('info', `Profile created for user_id: ${userId}`);
            // Create Exerciser
            newExerciser = new Exerciser_1.Exerciser();
            newExerciser.id = (0, uuid_1.v4)();
            newExerciser.user_id = userId;
            newExerciser.training_emphasis = Exerciser_1.TrainingEmphasis.MUSCLE_SIZE;
            newExerciser.programs = [];
            newExerciser.height_cm = 0;
            newExerciser.weight_kg = 0;
            newExerciser.body_fat_percentage = 0;
            newExerciser.weekly_workout_frequency = 0;
            newExerciser.created_at = new Date();
            newExerciser.updated_at = new Date();
            yield transactionalEntityManager.save(newExerciser);
            (0, logger_1.logMessage)('info', `Exerciser created for user_id: ${userId}`);
            // Create Investor
            newInvestor = new Investor_1.Investor();
            newInvestor.id = (0, uuid_1.v4)();
            newInvestor.user_id = userId;
            newInvestor.investment_goal = Investor_2.InvestmentGoal.LONG_TERM_GROWTH;
            newInvestor.risk_tolerance = Investor_2.RiskTolerance.MEDIUM;
            newInvestor.experience_level = Investor_2.ExperienceLevel.BEGINNER;
            newInvestor.annual_investment_budget = 0;
            newInvestor.auto_invest_enabled = false;
            newInvestor.watchlist = [];
            newInvestor.investments = [];
            yield transactionalEntityManager.save(newInvestor);
            (0, logger_1.logMessage)('info', `Investor created for user_id: ${userId}`);
        }));
        // Token generation
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        const token = jsonwebtoken_1.default.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });
        // Return all new entities in response
        res.status(201).json({
            message: 'User, profile, exerciser, and investor registered successfully',
            data: {
                token,
                user: newUser,
                profile: newProfile,
                exerciser: newExerciser,
                investor: newInvestor,
            },
        });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `Registration error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            (0, logger_1.logMessage)('error', 'Missing email or password');
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const user = yield userRepository.findOne({ where: { email } });
        if (!user) {
            (0, logger_1.logMessage)('error', `User with email ${email} not found`);
            res.status(401).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            (0, logger_1.logMessage)('error', `Invalid password for email ${email}`);
            res.status(401).json({ message: `Invalid password for email ${email}` });
            return;
        }
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        (0, logger_1.logMessage)('info', `Login successful for user: ${user.id}`);
        res.status(200).json({
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            },
        });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `Login error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Refresh Token
router.post('/refresh', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const email = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
        if (!userId || !email) {
            (0, logger_1.logMessage)('error', 'Unauthorized: Missing user ID or email');
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        const newToken = jsonwebtoken_1.default.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });
        (0, logger_1.logMessage)('info', `Token refreshed for user: ${userId}`);
        res.status(200).json({
            message: 'Token refreshed successfully',
            data: { token: newToken, user: { id: userId, email } },
        });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `Token refresh error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Update User
router.put('/me', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { email, password } = req.body;
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (!user) {
            (0, logger_1.logMessage)('error', `User not found: ${userId}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (email) {
            const existingUser = yield userRepository.findOne({ where: { email } });
            if (existingUser && existingUser.id !== userId) {
                (0, logger_1.logMessage)('error', `Email ${email} already in use`);
                res.status(400).json({ message: 'Email already in use' });
                return;
            }
            user.email = email;
        }
        if (password) {
            user.password = yield bcryptjs_1.default.hash(password, 10);
        }
        yield userRepository.save(user);
        (0, logger_1.logMessage)('info', `User updated: ${userId}`);
        res.status(200).json({
            message: 'User updated successfully',
            data: { user: { id: user.id, email: user.email } },
        });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `User update error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Delete User
router.delete('/me', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            (0, logger_1.logMessage)('error', 'Invalid user ID');
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (!user) {
            (0, logger_1.logMessage)('error', `User not found: ${userId}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        yield userRepository.remove(user);
        (0, logger_1.logMessage)('info', `User deleted: ${userId}`);
        res.status(200).json({ message: 'User and associated data deleted successfully' });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `User deletion error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
