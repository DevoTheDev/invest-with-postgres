import express, { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import { Exerciser, FitnessGoal, ActivityLevel } from '../../entities/Exerciser-Entities/Exerciser';
import { Profile } from '../../entities/Profile';
import { Request } from '../../types/express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsOptional, IsNumber, IsArray, IsString } from 'class-validator';
import { logMessage } from '../../utils/logger';

const router = express.Router();
const exerciserRepository = AppDataSource.getRepository(Exerciser);
const profileRepository = AppDataSource.getRepository(Profile);

class ExerciserDTO {
  @IsEnum(FitnessGoal)
  @IsOptional()
  fitness_goal?: FitnessGoal;

  @IsEnum(ActivityLevel)
  @IsOptional()
  activity_level?: ActivityLevel;

  @IsNumber()
  @IsOptional()
  height_cm?: number;

  @IsNumber()
  @IsOptional()
  weight_kg?: number;

  @IsNumber()
  @IsOptional()
  body_fat_percentage?: number;

  @IsNumber()
  @IsOptional()
  weekly_workout_frequency?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferred_exercise_types?: string[];
}

// Create Exerciser
const createExerciser: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const dto = plainToClass(ExerciserDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for exerciser creation');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    const profile = await profileRepository.findOne({ where: { id: userId } });
    if (!profile) {
      logMessage('error', `Profile not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    const existingExerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
    if (existingExerciser) {
      logMessage('error', `Exerciser already exists for user_id: ${userId}`);
      res.status(400).json({ message: 'Exerciser already exists for this user' });
      return;
    }

    const exerciser = exerciserRepository.create({
      user_id: userId,
      profile_id: profile.id,
      user: req.user!,
      profile,
      fitness_goal: dto.fitness_goal ?? FitnessGoal.GENERAL_FITNESS,
      activity_level: dto.activity_level ?? ActivityLevel.SEDENTARY,
      height_cm: dto.height_cm,
      weight_kg: dto.weight_kg,
      body_fat_percentage: dto.body_fat_percentage,
      weekly_workout_frequency: dto.weekly_workout_frequency,
      preferred_exercise_types: dto.preferred_exercise_types ?? [],
    });

    const savedExerciser = await exerciserRepository.save(exerciser);
    logMessage('info', `Exerciser created for user_id: ${userId}`);
    res.status(201).json({ message: 'Exerciser created', data: { exerciser: savedExerciser } });
  } catch (error: any) {
    logMessage('error', `Error creating exerciser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Exerciser
const getExerciser: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const exerciser = await exerciserRepository.findOne({
      where: { user_id: userId },
      relations: ['user', 'profile'],
    });

    if (!exerciser) {
      logMessage('info', `Exerciser not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Exerciser not found' });
      return;
    }

    logMessage('info', `Exerciser retrieved for user_id: ${userId}`);
    res.status(200).json({ message: 'Exerciser retrieved', data: { exerciser } });
  } catch (error: any) {
    logMessage('error', `Error fetching exerciser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Exerciser
const updateExerciser: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const dto = plainToClass(ExerciserDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for exerciser update');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
    if (!exerciser) {
      logMessage('info', `Exerciser not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Exerciser not found' });
      return;
    }

    exerciserRepository.merge(exerciser, {
      fitness_goal: dto.fitness_goal ?? exerciser.fitness_goal,
      activity_level: dto.activity_level ?? exerciser.activity_level,
      height_cm: dto.height_cm ?? exerciser.height_cm,
      weight_kg: dto.weight_kg ?? exerciser.weight_kg,
      body_fat_percentage: dto.body_fat_percentage ?? exerciser.body_fat_percentage,
      weekly_workout_frequency: dto.weekly_workout_frequency ?? exerciser.weekly_workout_frequency,
      preferred_exercise_types: dto.preferred_exercise_types ?? exerciser.preferred_exercise_types,
    });

    const updatedExerciser = await exerciserRepository.save(exerciser);
    logMessage('info', `Exerciser updated for user_id: ${userId}`);
    res.status(200).json({ message: 'Exerciser updated', data: { exerciser: updatedExerciser } });
  } catch (error: any) {
    logMessage('error', `Error updating exerciser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Exerciser
const deleteExerciser: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
    if (!exerciser) {
      logMessage('info', `Exerciser not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Exerciser not found' });
      return;
    }

    await exerciserRepository.remove(exerciser);
    logMessage('info', `Exerciser deleted for user_id: ${userId}`);
    res.status(200).json({ message: 'Exerciser deleted' });
  } catch (error: any) {
    logMessage('error', `Error deleting exerciser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.post('/', authMiddleware, createExerciser);
router.get('/', authMiddleware, getExerciser);
router.put('/', authMiddleware, updateExerciser);
router.delete('/', authMiddleware, deleteExerciser);

export default router;