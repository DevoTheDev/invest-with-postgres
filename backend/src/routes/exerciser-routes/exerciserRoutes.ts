import express, { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import { Exerciser, TrainingEmphasis, Workout } from '../../entities/Exerciser-Entities/Exerciser';
import { Movement } from '../../entities/Exerciser-Entities/Movement';
import { Request } from '../../types/express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate, IsEnum, IsOptional, IsNumber, IsArray } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { logMessage } from '../../utils/logger';
import { clarity } from '../../utils/clarity';

const router = express.Router();
const exerciserRepository = AppDataSource.getRepository(Exerciser);
const movementsRepository = AppDataSource.getRepository(Movement);

class ExerciserDTO {
  @IsEnum(TrainingEmphasis)
  @IsOptional()
  training_emphasis?: TrainingEmphasis;

  @IsArray()
  @IsOptional()
  programs?: Workout[];

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
}

const getExerciser: RequestHandler = async (req: Request, res) => {
  try {
    const userId = req.user!.id;
    const exerciser = await exerciserRepository.findOne({
      where: { user_id: userId },
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

const updateExerciser: RequestHandler = async (req: Request, res) => {
  try {
    const userId = req.user!.id;

    const exerciser = await exerciserRepository.findOne({ where: { user_id: userId } });
    if (!exerciser) {
      clarity(`Exerciser not found for user_id:,`, userId);
      res.status(404).json({ message: 'Exerciser not found' });
      return;
    }

    clarity("Exerciser before UPDATE", exerciser);

    exerciserRepository.merge(exerciser, req.body as Partial<Exerciser>);
    const updatedExerciser = await exerciserRepository.save(exerciser);
    clarity(`Exerciser updated for user_id: ${userId}`, updatedExerciser);
    res.status(200).json({ message: 'Exerciser updated', data: updatedExerciser });
  } catch (error: any) {
    clarity(`Error updating exerciser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getMovements: RequestHandler = async (req: Request, res) => {
  try {
  
    const userId = req.user!.id;
    const movements = await movementsRepository.find();

    logMessage('info', `Retrieved ${movements.length} movements from DB for user_id: ${userId}`);
    res.status(200).json({ message: 'Movements retrieved', data: movements });
  } catch (error: any) {
    logMessage('error', `Error fetching movements: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/', authMiddleware, getExerciser);
router.put('/', authMiddleware, updateExerciser);
router.get('/movements', authMiddleware, getMovements);

export default router;
