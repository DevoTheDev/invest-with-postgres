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
exports.WatchlistTicker = void 0;
const typeorm_1 = require("typeorm");
const Watchlist_1 = require("./Watchlist");
let WatchlistTicker = class WatchlistTicker {
};
exports.WatchlistTicker = WatchlistTicker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WatchlistTicker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], WatchlistTicker.prototype, "ticker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Watchlist_1.Watchlist, (watchlist) => watchlist.tickers),
    __metadata("design:type", Watchlist_1.Watchlist)
], WatchlistTicker.prototype, "watchlist", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'watchlist_id', type: 'integer' }),
    __metadata("design:type", Number)
], WatchlistTicker.prototype, "watchlist_id", void 0);
exports.WatchlistTicker = WatchlistTicker = __decorate([
    (0, typeorm_1.Entity)('watchlist_tickers')
], WatchlistTicker);
