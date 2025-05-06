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
exports.Investor = void 0;
const typeorm_1 = require("typeorm");
const Watchlist_1 = require("./Watchlist");
const Investment_1 = require("./Investment");
let Investor = class Investor {
};
exports.Investor = Investor;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id', type: 'integer' }),
    __metadata("design:type", Number)
], Investor.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Watchlist_1.Watchlist, (watchlist) => watchlist.investor),
    __metadata("design:type", Array)
], Investor.prototype, "watchlists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Investment_1.Investment, (investment) => investment.investor),
    __metadata("design:type", Array)
], Investor.prototype, "investments", void 0);
exports.Investor = Investor = __decorate([
    (0, typeorm_1.Entity)('investors')
], Investor);
