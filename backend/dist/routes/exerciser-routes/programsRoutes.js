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
exports.WorkoutDTO = void 0;
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../../data-source");
const Exerciser_1 = require("../../entities/Exerciser-Entities/Exerciser");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const logger_1 = require("../../utils/logger");
/*

    If you 'dropSchema', reseed the 'movements' table with this command:

        INSERT INTO movements (title, description) VALUES
('Push-Up', 'A bodyweight exercise that targets the chest, shoulders, and triceps.'),
('Sit-Up', 'An abdominal exercise focusing on the core muscles.'),
('Pull-Up', 'An upper body exercise primarily working the back and biceps.'),
('Chin-Up', 'A variation of the pull-up with a supinated grip targeting biceps and lats.'),
('Crunch', 'A core exercise focusing on the upper abdominal muscles.'),
('Bench Press', 'A pressing exercise with barbell, dumbbell, or machine, targeting the chest, shoulders, and triceps.'),
('Bicep Curl', 'An isolation exercise for the biceps using barbell, dumbbell, or machine.'),
('Lunge', 'A lower body exercise that targets the quads, hamstrings, and glutes.'),
('Bulgarian Split Squat', 'A single-leg squat variation focusing on quads and glutes.'),
('Back Squat', 'A squat with a barbell placed on the upper back, targeting the quads, hamstrings, and glutes.'),
('Front Squat', 'A squat with a barbell in front of the shoulders, emphasizing quads and core stability.'),
('Deadlift', 'A compound lift that works the posterior chain, including hamstrings, glutes, and back.'),
('Romanian Deadlift', 'A deadlift variation focusing on hamstrings and glutes with less knee bend.'),
('Hamstring Curl', 'An isolation exercise for the hamstrings performed on a machine.'),
('Bent Over Row', 'A rowing movement with barbell, dumbbell, or machine to target the back muscles.'),
('Forearm Curls', 'An isolation exercise focusing on forearm strength and endurance.'),
('Calf Raises', 'A lower leg exercise targeting the calf muscles.'),
('Lat Pulldown', 'A machine-based pull-down targeting the latissimus dorsi muscles.'),
('Leg Press', 'A lower body compound exercise performed on a leg press machine.'),
('Box Jump', 'A plyometric exercise focusing on lower body power and explosiveness.'),
('Preacher Curls', 'A bicep isolation exercise performed with barbell or dumbbell on a preacher bench.'),
('Spider Curls', 'A bicep isolation movement performed with chest supported on an incline bench.');

*/
const router = express_1.default.Router();
const exerciserRepository = data_source_1.AppDataSource.getRepository(Exerciser_1.Exerciser);
class ExerciseDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ExerciseDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExerciseDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExerciseDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ExerciseDTO.prototype, "reps", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ExerciseDTO.prototype, "sets", void 0);
class WorkoutDTO {
}
exports.WorkoutDTO = WorkoutDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkoutDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ExerciseDTO),
    __metadata("design:type", Array)
], WorkoutDTO.prototype, "workouts", void 0);
// Add a workout to programs
const addWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const dto = (0, class_transformer_1.plainToClass)(WorkoutDTO, req.body);
        const errors = yield (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            (0, logger_1.logMessage)('error', 'Validation failed for adding workout');
            res.status(400).json({ message: 'Validation failed', errors });
            return;
        }
        const exerciser = yield exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }
        const newWorkout = {
            id: crypto.randomUUID(),
            title: dto.title,
            workouts: dto.workouts,
        };
        exerciser.programs.push(newWorkout);
        yield exerciserRepository.save(exerciser);
        res.status(201).json({ message: 'Workout added', data: newWorkout });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error adding workout: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Delete a workout by ID
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { workoutId } = req.params;
        const exerciser = yield exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }
        const originalLength = exerciser.programs.length;
        exerciser.programs = exerciser.programs.filter(workout => workout.id !== workoutId);
        if (exerciser.programs.length === originalLength) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        yield exerciserRepository.save(exerciser);
        res.status(200).json({ message: 'Workout deleted' });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error deleting workout: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update a workout by ID
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { workoutId } = req.params;
        const exerciser = yield exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }
        const workoutIndex = exerciser.programs.findIndex(workout => workout.id === workoutId);
        if (workoutIndex === -1) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        exerciser.programs[workoutIndex] = Object.assign({ id: workoutId }, req.body);
        yield exerciserRepository.save(exerciser);
        res.status(200).json({ message: 'Workout updated', data: exerciser.programs[workoutIndex] });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error updating workout: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get all workouts for the current user
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const exerciser = yield exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }
        res.status(200).json({ message: 'Workouts retrieved', data: exerciser.programs });
    }
    catch (error) {
        (0, logger_1.logMessage)('error', `Error fetching workouts: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
});
// ROUTES
router.get('/', authMiddleware_1.authMiddleware, getWorkouts);
router.post('/', authMiddleware_1.authMiddleware, addWorkout);
router.delete('/:workoutId', authMiddleware_1.authMiddleware, deleteWorkout);
router.put('/:workoutId', authMiddleware_1.authMiddleware, updateWorkout);
exports.default = router;
