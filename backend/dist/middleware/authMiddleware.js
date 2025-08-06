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
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const GetSecret_1 = require("../utils/GetSecret");
const logger_1 = require("../utils/logger");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        const JWT_SECRET = yield (0, GetSecret_1.getSecret)('jwt_secret');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            (0, logger_1.logMessage)('error', 'Missing or invalid Authorization header');
            res.status(401).json({ message: 'Missing or invalid Authorization header.' });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = yield userRepository.findOne({ where: { id: decoded.userId } });
            if (!user) {
                (0, logger_1.logMessage)('error', `User not found for userId: ${decoded.userId}`);
                res.status(404).json({ message: 'User not found.' });
                return;
            }
            req.user = user;
            next();
        }
        catch (err) {
            (0, logger_1.logMessage)('error', `Authentication error: ${err.message}`, { stack: err.stack });
            res.status(401).json({ message: 'Invalid or expired token.' });
            return;
        }
    });
}
