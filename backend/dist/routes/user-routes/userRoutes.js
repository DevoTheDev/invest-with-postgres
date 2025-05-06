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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../entities/User");
const Profile_1 = require("../../entities/Profile");
const data_source_1 = require("../../data-source");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const uuid_1 = require("uuid");
const GetSecret_1 = require("../../utils/GetSecret");
const logger_1 = require("../../utils/logger");
const router = express_1.default.Router();
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const profileRepository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
// ------------------------- REGISTER -------------------------
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        (0, logger_1.logMessage)('info', `Registering user with email: ${req.body.email}`);
        const { email, password } = req.body;
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            (0, logger_1.logMessage)('error', 'Invalid email or password provided');
            res.status(400).json({ message: 'Email and password are required and must be strings.' });
            return;
        }
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            (0, logger_1.logMessage)('error', `User with email ${email} already exists`);
            res.status(400).json({ message: 'User already exists.' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        (0, logger_1.logMessage)('info', 'Password hashed successfully');
        const newUser = userRepository.create({
            email,
            password: hashedPassword,
            _id: (0, uuid_1.v4)()
        });
        yield userRepository.save(newUser);
        (0, logger_1.logMessage)('info', `User created with id: ${newUser.id}, _id: ${newUser._id}`);
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
        (0, logger_1.logMessage)('info', `JWT generated for user: ${newUser._id}`);
        res.status(201).json({
            message: 'User registered successfully.',
            token,
            user: {
                _id: newUser._id,
                email: newUser.email
            }
        });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `Registration error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error during registration.' });
    }
}));
// ------------------------- LOGIN -------------------------
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            (0, logger_1.logMessage)('error', 'Invalid email or password provided');
            res.status(400).json({ message: 'Email and password are required and must be strings.' });
            return;
        }
        const user = yield userRepository.findOne({ where: { email } });
        if (!user) {
            (0, logger_1.logMessage)('error', `User with email ${email} not found`);
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            (0, logger_1.logMessage)('error', `Invalid password for email ${email}`);
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        (0, logger_1.logMessage)('info', `Login successful for user: ${user._id}`);
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                _id: user._id,
                email: user.email
            }
        });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `Login error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error during login.' });
    }
}));
// ------------------------- REFRESH TOKEN -------------------------
router.post('/refresh', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const email = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
        if (!userId || !email) {
            (0, logger_1.logMessage)('error', 'Unauthorized: Missing user ID or email');
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = yield userRepository.findOne({ where: { _id: userId } });
        if (!user) {
            (0, logger_1.logMessage)('error', `User not found for userId: ${userId}`);
            return res.status(404).json({ message: 'User not found' });
        }
        const newToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        (0, logger_1.logMessage)('info', `Token refreshed for user: ${user._id}`);
        res.status(200).json({
            message: 'Token refreshed successfully.',
            token: newToken,
            user: {
                _id: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Token refresh error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'Internal server error during token refresh.' });
    }
}));
// ------------------------- DELETE USER -------------------------
router.delete('/me', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            (0, logger_1.logMessage)('error', 'Invalid user ID');
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }
        const user = yield userRepository.findOne({ where: { _id: userId } });
        if (!user) {
            (0, logger_1.logMessage)('error', `User not found for userId: ${userId}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Profile will be deleted automatically via CASCADE
        yield userRepository.remove(user);
        (0, logger_1.logMessage)('info', `User deleted: ${userId}`);
        res.status(200).json({ message: 'User and associated profile deleted successfully' });
    }
    catch (err) {
        (0, logger_1.logMessage)('error', `User deletion error: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Internal server error during user deletion' });
    }
}));
exports.default = router;
