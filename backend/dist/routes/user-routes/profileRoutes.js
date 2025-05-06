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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../../data-source");
const Profile_1 = require("../../entities/Profile");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const class_validator_2 = require("class-validator");
const logger_1 = require("../../utils/logger");
const shared_types_1 = require("../../types/shared/shared-types");
class ProfileDTO {
}
__decorate([
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_2.IsEmail)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Matches)(/^[a-zA-Z0-9_]{3,50}$/, { message: 'Username must be 3-50 characters and contain only letters, numbers, or underscores' }),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "bio", void 0);
__decorate([
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "avatarUrl", void 0);
__decorate([
    (0, class_validator_2.IsEnum)(shared_types_1.ThemePreference),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "themePreference", void 0);
__decorate([
    (0, class_validator_2.IsEnum)(shared_types_1.LanguageOption),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "language", void 0);
__decorate([
    (0, class_validator_2.IsObject)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Object)
], ProfileDTO.prototype, "notifications", void 0);
__decorate([
    (0, class_validator_2.IsObject)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Object)
], ProfileDTO.prototype, "dataUsage", void 0);
__decorate([
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Boolean)
], ProfileDTO.prototype, "isEmailVerified", void 0);
__decorate([
    (0, class_validator_2.IsBoolean)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", Boolean)
], ProfileDTO.prototype, "isActive", void 0);
const router = (0, express_1.Router)();
const profileRepo = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
// POST /api/profiles
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            (0, logger_1.logMessage)('error', 'Invalid user ID');
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const existingProfile = yield profileRepo.findOne({ where: { id: userId } });
        if (existingProfile) {
            (0, logger_1.logMessage)('error', `Profile already exists for user_id: ${userId}`);
            return res.status(400).json({ message: 'Profile already exists for this user' });
        }
        const dto = (0, class_transformer_1.plainToClass)(ProfileDTO, req.body);
        const errors = yield (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            (0, logger_1.logMessage)('error', 'Validation failed for profile creation');
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        const profile = new Profile_1.Profile();
        profile.id = userId;
        profile.name = (_b = dto.name) !== null && _b !== void 0 ? _b : '';
        profile.email = (_c = dto.email) !== null && _c !== void 0 ? _c : '';
        profile.username = (_d = dto.username) !== null && _d !== void 0 ? _d : '';
        profile.bio = (_e = dto.bio) !== null && _e !== void 0 ? _e : undefined;
        profile.avatarUrl = (_f = dto.avatarUrl) !== null && _f !== void 0 ? _f : undefined;
        profile.themePreference = (_g = dto.themePreference) !== null && _g !== void 0 ? _g : shared_types_1.ThemePreference.System;
        profile.language = (_h = dto.language) !== null && _h !== void 0 ? _h : shared_types_1.LanguageOption.En;
        profile.notifications = (_j = dto.notifications) !== null && _j !== void 0 ? _j : { email: true, push: true };
        profile.dataUsage = (_k = dto.dataUsage) !== null && _k !== void 0 ? _k : { backgroundSync: false, activityLogs: false };
        profile.isEmailVerified = (_l = dto.isEmailVerified) !== null && _l !== void 0 ? _l : false;
        profile.isActive = (_m = dto.isActive) !== null && _m !== void 0 ? _m : true;
        profile.created_at = new Date().toISOString();
        profile.updated_at = new Date().toISOString();
        yield profileRepo.save(profile);
        (0, logger_1.logMessage)('info', `Profile created for user_id: ${userId}`);
        return res.status(201).json({ message: 'Profile created', profile });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error creating profile: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
// GET /api/profiles/:userId
router.get('/:userId', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.userId;
        if (!userId || typeof userId !== 'string') {
            (0, logger_1.logMessage)('error', 'Invalid user ID format');
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) !== userId) {
            (0, logger_1.logMessage)('error', `Unauthorized access to profile for user_id: ${userId}`);
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const profile = yield profileRepo.findOne({ where: { id: userId } });
        if (!profile) {
            (0, logger_1.logMessage)('info', `Profile not found for user_id: ${userId}`);
            return res.status(404).json({ message: 'Profile not found' });
        }
        (0, logger_1.logMessage)('info', `Profile retrieved for user_id: ${userId}`);
        return res.status(200).json({ message: 'Profile retrieved', profile });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error retrieving profile: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
// PUT /api/profiles/:userId
router.put('/:userId', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    try {
        const userId = req.params.userId;
        if (!userId || typeof userId !== 'string') {
            (0, logger_1.logMessage)('error', 'Invalid user ID format');
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (userId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            (0, logger_1.logMessage)('error', `Forbidden: Attempt to update profile for user_id: ${userId}`);
            return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
        }
        const profile = yield profileRepo.findOne({ where: { id: userId } });
        if (!profile) {
            (0, logger_1.logMessage)('info', `Profile not found for user_id: ${userId}`);
            return res.status(404).json({ message: 'Profile not found' });
        }
        const dto = (0, class_transformer_1.plainToClass)(ProfileDTO, req.body);
        const errors = yield (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            (0, logger_1.logMessage)('error', 'Validation failed for profile update');
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        profile.name = (_b = dto.name) !== null && _b !== void 0 ? _b : profile.name;
        profile.email = (_c = dto.email) !== null && _c !== void 0 ? _c : profile.email;
        profile.username = (_d = dto.username) !== null && _d !== void 0 ? _d : profile.username;
        profile.bio = (_e = dto.bio) !== null && _e !== void 0 ? _e : profile.bio;
        profile.avatarUrl = (_f = dto.avatarUrl) !== null && _f !== void 0 ? _f : profile.avatarUrl;
        profile.themePreference = (_g = dto.themePreference) !== null && _g !== void 0 ? _g : profile.themePreference;
        profile.language = (_h = dto.language) !== null && _h !== void 0 ? _h : profile.language;
        profile.notifications = (_j = dto.notifications) !== null && _j !== void 0 ? _j : profile.notifications;
        profile.dataUsage = (_k = dto.dataUsage) !== null && _k !== void 0 ? _k : profile.dataUsage;
        profile.isEmailVerified = (_l = dto.isEmailVerified) !== null && _l !== void 0 ? _l : profile.isEmailVerified;
        profile.isActive = (_m = dto.isActive) !== null && _m !== void 0 ? _m : profile.isActive;
        profile.updated_at = new Date().toISOString();
        yield profileRepo.save(profile);
        (0, logger_1.logMessage)('info', `Profile updated for user_id: ${userId}`);
        return res.status(200).json({ message: 'Profile updated', profile });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error updating profile: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
// DELETE /api/profiles/:userId
router.delete('/:userId', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.userId;
        if (!userId || typeof userId !== 'string') {
            (0, logger_1.logMessage)('error', 'Invalid user ID format');
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (userId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            (0, logger_1.logMessage)('error', `Forbidden: Attempt to delete profile for user_id: ${userId}`);
            return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
        }
        const profile = yield profileRepo.findOne({ where: { id: userId } });
        if (!profile) {
            (0, logger_1.logMessage)('info', `Profile not found for user_id: ${userId}`);
            return res.status(404).json({ message: 'Profile not found' });
        }
        yield profileRepo.remove(profile);
        (0, logger_1.logMessage)('info', `Profile deleted for user_id: ${userId}`);
        return res.status(200).json({ message: 'Profile deleted' });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error deleting profile: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
