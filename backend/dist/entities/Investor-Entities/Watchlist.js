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
exports.Watchlist = void 0;
const typeorm_1 = require("typeorm");
const Investor_1 = require("./Investor");
const WatchlistTicker_1 = require("./WatchlistTicker");
let Watchlist = class Watchlist {
};
exports.Watchlist = Watchlist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Watchlist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Watchlist.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Investor_1.Investor, (investor) => investor.watchlists),
    __metadata("design:type", Investor_1.Investor)
], Watchlist.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'investor_id', type: 'integer' }),
    __metadata("design:type", Number)
], Watchlist.prototype, "investor_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WatchlistTicker_1.WatchlistTicker, (watchlistTicker) => watchlistTicker.watchlist),
    __metadata("design:type", Array)
], Watchlist.prototype, "tickers", void 0);
exports.Watchlist = Watchlist = __decorate([
    (0, typeorm_1.Entity)('watchlists')
], Watchlist);
