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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const shared_types_1 = require("../types/shared/shared-types");
let Profile = class Profile {
    constructor() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.username = '';
        this.themePreference = shared_types_1.ThemePreference.System;
        this.language = shared_types_1.LanguageOption.En;
        this.notifications = { email: true, push: true };
        this.dataUsage = {
            backgroundSync: false,
            activityLogs: false,
        };
        this.isEmailVerified = false;
        this.isActive = true;
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id', type: 'varchar' }),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Profile.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: shared_types_1.ThemePreference.System }),
    __metadata("design:type", String)
], Profile.prototype, "themePreference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, default: shared_types_1.LanguageOption.En }),
    __metadata("design:type", String)
], Profile.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: () => "'{\"email\": true, \"push\": true}'" }),
    __metadata("design:type", Object)
], Profile.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: () => "'{\"backgroundSync\": false, \"activityLogs\": false}'" }),
    __metadata("design:type", Object)
], Profile.prototype, "dataUsage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Profile.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: () => "'1970-01-01T00:00:00.000Z'" }),
    __metadata("design:type", String)
], Profile.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: () => "'1970-01-01T00:00:00.000Z'", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], Profile.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id', referencedColumnName: '_id' }),
    __metadata("design:type", User_1.User)
], Profile.prototype, "user", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)('profiles')
], Profile);
