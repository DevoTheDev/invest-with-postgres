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
exports.Investment = void 0;
const typeorm_1 = require("typeorm");
const Investor_1 = require("./Investor");
let Investment = class Investment {
};
exports.Investment = Investment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Investment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Investment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Investment.prototype, "ticker", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Investment.prototype, "shares", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Investment.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Investment.prototype, "lastInvestmentAdjustment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Investor_1.Investor, (investor) => investor.investments),
    __metadata("design:type", Investor_1.Investor)
], Investment.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'investor_id', type: 'integer' }),
    __metadata("design:type", Number)
], Investment.prototype, "investor_id", void 0);
exports.Investment = Investment = __decorate([
    (0, typeorm_1.Entity)('investments')
], Investment);
