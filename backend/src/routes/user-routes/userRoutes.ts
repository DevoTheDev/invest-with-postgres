import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/User';
import { Profile } from '../../entities/Profile';
import { Exerciser, TrainingEmphasis } from '../../entities/Exerciser-Entities/Exerciser';
import { Investor } from '../../entities/Investor-Entities/Investor';
import { AppDataSource } from '../../data-source';
import { Request } from '../../types/express';
import { Response } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';
import { getSecret } from '../../utils/GetSecret';
import { logMessage } from '../../utils/logger';
import { ThemePreference, LanguageOption } from '../../types/shared/shared-types';
import { InvestmentGoal, RiskTolerance, ExperienceLevel } from '../../entities/Investor-Entities/Investor';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

export function errorHandler(res: Response, error: any, context: string = 'Unknown error'): void {
  logMessage('error', `${context}: ${error.message}`, { stack: error.stack });
  res.status(500).json({
    status: 'error',
    message: `An unexpected error occurred while processing: ${context}`,
    errorType: error.name || 'InternalServerError',
    details: error.details || {},
  });
}

// Register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  try {
    logMessage('info', 'Registration request received', { body: req.body });
    const { email, password } = req.body;

    if (!email || !password) {
      logMessage('error', 'Missing email or password');
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      logMessage('error', `User with email ${email} already exists`);
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    let newUser!: User;
    let newProfile!: Profile;
    let newExerciser!: Exerciser;
    let newInvestor!: Investor;

    await AppDataSource.transaction(async (transactionalEntityManager) => {
      // Create User
      newUser = new User();
      newUser.id = userId;
      newUser.email = email;
      newUser.password = hashedPassword;
      await transactionalEntityManager.save(newUser);
      logMessage('info', `User created with id: ${newUser.id}`);

      // Create Profile
      newProfile = new Profile();
      newProfile.id = uuidv4();
      newProfile.user_id = userId;
      newProfile.username = `user_${uuidv4().substring(0, 8)}`;
      newProfile.name = '';
      newProfile.email = email;
      newProfile.themePreference = ThemePreference.System;
      newProfile.language = LanguageOption.En;
      newProfile.notifications = { email: true, push: true };
      newProfile.dataUsage = { backgroundSync: false, activityLogs: false };
      await transactionalEntityManager.save(newProfile);
      logMessage('info', `Profile created for user_id: ${userId}`);

      // Create Exerciser
      newExerciser = new Exerciser();
      newExerciser.id = uuidv4();
      newExerciser.user_id = userId;
      newExerciser.training_emphasis = TrainingEmphasis.MUSCLE_SIZE;
      newExerciser.programs = [];
      newExerciser.height_cm = 0;
      newExerciser.weight_kg = 0;
      newExerciser.body_fat_percentage = 0;
      newExerciser.weekly_workout_frequency = 0;
      newExerciser.created_at = new Date();
      newExerciser.updated_at = new Date();
      await transactionalEntityManager.save(newExerciser);
      logMessage('info', `Exerciser created for user_id: ${userId}`);

      // Create Investor
      newInvestor = new Investor();
      newInvestor.id = uuidv4();
      newInvestor.user_id = userId;
      newInvestor.investment_goal = InvestmentGoal.LONG_TERM_GROWTH;
      newInvestor.risk_tolerance = RiskTolerance.MEDIUM;
      newInvestor.experience_level = ExperienceLevel.BEGINNER;
      newInvestor.annual_investment_budget = 0;
      newInvestor.auto_invest_enabled = false;
      newInvestor.watchlist = [];
      newInvestor.investments = [];
      await transactionalEntityManager.save(newInvestor);
      logMessage('info', `Investor created for user_id: ${userId}`);
    });

    // Token generation
    const JWT_SECRET = await getSecret('jwt_secret');
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });

    // Return all new entities in response
    res.status(201).json({
      message: 'User, profile, exerciser, and investor registered successfully',
      data: {
        token,
        user: newUser,
        profile: newProfile,
        exerciser: newExerciser,
        investor: newInvestor,
      },
    });

  } catch (err: any) {
    logMessage('error', `Registration error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      logMessage('error', 'Missing email or password');
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      logMessage('error', `User with email ${email} not found`);
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logMessage('error', `Invalid password for email ${email}`);
      res.status(401).json({ message: `Invalid password for email ${email}` });
      return;
    }

    const JWT_SECRET = await getSecret('jwt_secret');
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    logMessage('info', `Login successful for user: ${user.id}`);

    res.status(200).json({
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
  } catch (err: any) {
    logMessage('error', `Login error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Refresh Token
router.post('/refresh', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const email = req.user?.email;

    if (!userId || !email) {
      logMessage('error', 'Unauthorized: Missing user ID or email');
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const JWT_SECRET = await getSecret('jwt_secret');
    const newToken = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });
    logMessage('info', `Token refreshed for user: ${userId}`);

    res.status(200).json({
      message: 'Token refreshed successfully',
      data: { token: newToken, user: { id: userId, email } },
    });
  } catch (err: any) {
    logMessage('error', `Token refresh error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User
router.put('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      logMessage('error', `User not found: ${userId}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (email) {
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser && existingUser.id !== userId) {
        logMessage('error', `Email ${email} already in use`);
        res.status(400).json({ message: 'Email already in use' });
        return;
      }
      user.email = email;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await userRepository.save(user);
    logMessage('info', `User updated: ${userId}`);

    res.status(200).json({
      message: 'User updated successfully',
      data: { user: { id: user.id, email: user.email } },
    });
  } catch (err: any) {
    logMessage('error', `User update error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete User
router.delete('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      logMessage('error', 'Invalid user ID');
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      logMessage('error', `User not found: ${userId}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await userRepository.remove(user);
    logMessage('info', `User deleted: ${userId}`);

    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (err: any) {
    logMessage('error', `User deletion error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;