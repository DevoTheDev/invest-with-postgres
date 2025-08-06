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
exports.ProfileDTO = void 0;
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../../data-source");
const Profile_1 = require("../../entities/Profile");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
const clarity_1 = require("../../utils/clarity");
const shared_types_1 = require("../../types/shared/shared-types");
const router = express_1.default.Router();
const profileRepository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
class ProfileDTO {
}
exports.ProfileDTO = ProfileDTO;
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
    (0, class_validator_2.Matches)(/^[a-zA-Z0-9_]{3,50}$/, {
        message: 'Username must be 3-50 characters and contain only letters, numbers, or underscores',
    }),
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
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], ProfileDTO.prototype, "phone", void 0);
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
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            (0, clarity_1.clarity)('Invalid UUID format', userId);
            res.status(400).json({ message: 'Invalid user ID format' });
            return;
        }
        // Query by user_id instead of id
        const profile = yield profileRepository.findOne({ where: { user_id: userId } });
        if (!profile) {
            (0, clarity_1.clarity)(`Profile not found for user_id: ${userId}`, userId);
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        (0, clarity_1.clarity)(`Profile retrieved for user_id: ${userId}`, profile);
        res.status(200).json({ message: 'Profile retrieved', data: { profile } });
    }
    catch (error) {
        (0, clarity_1.clarity)(`Error retrieving profile: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    console.log('OBJECT received by PUT route on Request Body:', req.body);
    try {
        const userId = req.user.id;
        if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            (0, clarity_1.clarity)('Invalid UUID format', userId);
            res.status(400).json({ message: 'Invalid user ID format' });
            return;
        }
        // Query by user_id instead of id
        const profile = yield profileRepository.findOne({ where: { user_id: userId } });
        if (!profile) {
            (0, clarity_1.clarity)(`Profile not found for user_id: ${userId}`, userId);
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        const dto = (0, class_transformer_1.plainToClass)(ProfileDTO, req.body);
        const errors = yield (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            (0, clarity_1.clarity)("Mismatch between Request body and Profile DTO", { errors });
            res.status(400).json({ message: 'Validation failed', data: { errors } });
            return;
        }
        if (dto.email && dto.email !== profile.email) {
            const existingEmail = yield profileRepository.findOne({ where: { email: dto.email } });
            if (existingEmail) {
                (0, clarity_1.clarity)(`Email ${dto.email} already taken`, existingEmail);
                res.status(400).json({ message: 'Email already taken' });
                return;
            }
        }
        (0, clarity_1.clarity)(`Former profile object for user_id: ${userId}`, profile);
        profileRepository.merge(profile, {
            name: (_a = dto.name) !== null && _a !== void 0 ? _a : profile.name,
            email: (_b = dto.email) !== null && _b !== void 0 ? _b : profile.email,
            username: (_c = dto.username) !== null && _c !== void 0 ? _c : profile.username,
            bio: (_d = dto.bio) !== null && _d !== void 0 ? _d : profile.bio,
            phone: (_e = dto.phone) !== null && _e !== void 0 ? _e : profile.phone,
            avatarUrl: (_f = dto.avatarUrl) !== null && _f !== void 0 ? _f : profile.avatarUrl,
            themePreference: (_g = dto.themePreference) !== null && _g !== void 0 ? _g : profile.themePreference,
            language: (_h = dto.language) !== null && _h !== void 0 ? _h : profile.language,
            notifications: (_j = dto.notifications) !== null && _j !== void 0 ? _j : profile.notifications,
            dataUsage: (_k = dto.dataUsage) !== null && _k !== void 0 ? _k : profile.dataUsage,
            updated_at: new Date(),
        });
        const updatedProfile = yield profileRepository.save(profile);
        (0, clarity_1.clarity)(`Profile updated for user_id: ${userId}`, updatedProfile);
        res.status(200).json({ message: 'Profile updated', data: { updatedProfile } });
    }
    catch (error) {
        (0, clarity_1.clarity)(`Error updating profile: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/', authMiddleware_1.authMiddleware, getProfile);
router.put('/', authMiddleware_1.authMiddleware, updateProfile);
exports.default = router;
