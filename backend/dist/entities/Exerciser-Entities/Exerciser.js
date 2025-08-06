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
exports.Exerciser = exports.Exercise = exports.Movement = exports.TrainingEmphasis = void 0;
const typeorm_1 = require("typeorm");
// Enum for training emphasis
var TrainingEmphasis;
(function (TrainingEmphasis) {
    TrainingEmphasis["MUSCLE_SIZE"] = "muscle_size";
    TrainingEmphasis["MUSCLE_STRENGTH"] = "muscle_strength";
    TrainingEmphasis["MUSCLE_ENDURANCE"] = "muscle_endurance";
    TrainingEmphasis["MUSCLE_SHAPE"] = "muscle_shape";
})(TrainingEmphasis || (exports.TrainingEmphasis = TrainingEmphasis = {}));
// Movement base
class Movement {
}
exports.Movement = Movement;
// Exercise extends Movement
class Exercise extends Movement {
}
exports.Exercise = Exercise;
let Exerciser = class Exerciser {
};
exports.Exerciser = Exerciser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Exerciser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Exerciser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: TrainingEmphasis,
        default: TrainingEmphasis.MUSCLE_SIZE,
    }),
    __metadata("design:type", String)
], Exerciser.prototype, "training_emphasis", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { default: () => "'[]'" }),
    __metadata("design:type", Array)
], Exerciser.prototype, "programs", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Exerciser.prototype, "height_cm", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Exerciser.prototype, "weight_kg", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Exerciser.prototype, "body_fat_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Exerciser.prototype, "weekly_workout_frequency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exerciser.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Exerciser.prototype, "updated_at", void 0);
exports.Exerciser = Exerciser = __decorate([
    (0, typeorm_1.Entity)("exercisers"),
    (0, typeorm_1.Index)("idx_exercisers_user_id", ["user_id"])
], Exerciser);
