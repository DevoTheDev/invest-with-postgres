import express, { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import { Exerciser } from '../../entities/Exerciser-Entities/Exerciser';
import { authMiddleware } from '../../middleware/authMiddleware';
import { Request } from '../../types/express';
import { validate, IsString, IsArray, IsObject, IsInt, IsUUID, ValidateNested } from 'class-validator';
import { plainToClass, Type } from 'class-transformer';
import { logMessage } from '../../utils/logger';

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

const router = express.Router();
const exerciserRepository = AppDataSource.getRepository(Exerciser);

class ExerciseDTO {
    @IsString()
    @IsUUID()
    id!: string;  // ensure every exercise has a UUID

    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsInt()
    reps!: number;

    @IsInt()
    sets!: number;
}

export class WorkoutDTO {
    @IsString()
    title!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExerciseDTO)
    workouts!: ExerciseDTO[];
}

// Add a workout to programs
const addWorkout: RequestHandler = async (req: Request, res): Promise<void> => {
    try {
        const userId = req.user!.id;
        const dto = plainToClass(WorkoutDTO, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            logMessage('error', 'Validation failed for adding workout');
            res.status(400).json({ message: 'Validation failed', errors });
            return;
        }

        const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }

        const newWorkout = {
            id: crypto.randomUUID(),
            title: dto.title,
            workouts: dto.workouts,
        };

        exerciser.programs!.push(newWorkout);
        await exerciserRepository.save(exerciser);
        res.status(201).json({ message: 'Workout added', data: newWorkout });
    } catch (error: any) {
        logMessage('error', `Error adding workout: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a workout by ID
const deleteWorkout: RequestHandler = async (req: Request, res): Promise<void> => {
    try {
        const userId = req.user!.id;
        const { workoutId } = req.params;

        const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }

        const originalLength = exerciser.programs!.length;
        exerciser.programs = exerciser.programs!.filter(workout => workout.id !== workoutId);

        if (exerciser.programs.length === originalLength) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }

        await exerciserRepository.save(exerciser);
        res.status(200).json({ message: 'Workout deleted' });
    } catch (error: any) {
        logMessage('error', `Error deleting workout: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a workout by ID
const updateWorkout: RequestHandler = async (req: Request, res): Promise<void> => {
    try {
        const userId = req.user!.id;
        const { workoutId } = req.params;

        const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }

        const workoutIndex = exerciser.programs!.findIndex(workout => workout.id === workoutId);
        if (workoutIndex === -1) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }

        exerciser.programs![workoutIndex] = { id: workoutId, ...req.body };
        await exerciserRepository.save(exerciser);

        res.status(200).json({ message: 'Workout updated', data: exerciser.programs![workoutIndex] });
    } catch (error: any) {
        logMessage('error', `Error updating workout: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all workouts for the current user
const getWorkouts: RequestHandler = async (req: Request, res): Promise<void> => {
    try {
        const userId = req.user!.id;

        const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
        if (!exerciser) {
            res.status(404).json({ message: 'Exerciser not found' });
            return;
        }

        res.status(200).json({ message: 'Workouts retrieved', data: exerciser.programs });
    } catch (error: any) {
        logMessage('error', `Error fetching workouts: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ROUTES
router.get('/', authMiddleware, getWorkouts);
router.post('/', authMiddleware, addWorkout);
router.delete('/:workoutId', authMiddleware, deleteWorkout);
router.put('/:workoutId', authMiddleware, updateWorkout);

export default router;
