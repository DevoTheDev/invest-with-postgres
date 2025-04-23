import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/User';
import { Profile } from '../../entities/Profile';
import { AppDataSource } from '../../data-source';
import { Request } from '../../types/express';
import { Response } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';
import { getSecret } from '../../utils/GetSecret';
import { logMessage } from '../../utils/logger';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(Profile);

// ------------------------- REGISTER -------------------------
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const JWT_SECRET = await getSecret('jwt_secret');
    logMessage('info', `Registering user with email: ${req.body.email}`);

    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      logMessage('error', 'Invalid email or password provided');
      res.status(400).json({ message: 'Email and password are required and must be strings.' });
      return;
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      logMessage('error', `User with email ${email} already exists`);
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    logMessage('info', 'Password hashed successfully');

    const newUser = userRepository.create({
      email,
      password: hashedPassword,
      _id: uuidv4()
    });
    await userRepository.save(newUser);
    logMessage('info', `User created with id: ${newUser.id}, _id: ${newUser._id}`);

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
    logMessage('info', `JWT generated for user: ${newUser._id}`);

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: {
        _id: newUser._id,
        email: newUser.email
      }
    });
  } catch (err: any) {
    logMessage('error', `Registration error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// ------------------------- LOGIN -------------------------
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      logMessage('error', 'Invalid email or password provided');
      res.status(400).json({ message: 'Email and password are required and must be strings.' });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      logMessage('error', `User with email ${email} not found`);
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logMessage('error', `Invalid password for email ${email}`);
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const JWT_SECRET = await getSecret('jwt_secret');
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    logMessage('info', `Login successful for user: ${user._id}`);

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        _id: user._id,
        email: user.email
      }
    });
  } catch (err: any) {
    logMessage('error', `Login error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// ------------------------- REFRESH TOKEN -------------------------
router.post('/refresh', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const JWT_SECRET = await getSecret('jwt_secret');
    const userId = req.user?._id;
    const email = req.user?.email;

    if (!userId || !email) {
      logMessage('error', 'Unauthorized: Missing user ID or email');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await userRepository.findOne({ where: { _id: userId } });
    if (!user) {
      logMessage('error', `User not found for userId: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const newToken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    logMessage('info', `Token refreshed for user: ${user._id}`);

    res.status(200).json({
      message: 'Token refreshed successfully.',
      token: newToken,
      user: {
        _id: user._id,
        email: user.email
      }
    });
  } catch (error: any) {
    logMessage('error', `Token refresh error: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Internal server error during token refresh.' });
  }
});

// ------------------------- DELETE USER -------------------------
router.delete('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      logMessage('error', 'Invalid user ID');
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await userRepository.findOne({ where: { _id: userId } });
    if (!user) {
      logMessage('error', `User not found for userId: ${userId}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Delete associated profile
    const profile = await profileRepository.findOne({ where: { user_id: userId } });
    if (profile) {
      await profileRepository.remove(profile);
      logMessage('info', `Profile deleted for user_id: ${userId}`);
    }

    // Delete user
    await userRepository.remove(user);
    logMessage('info', `User deleted: ${userId}`);

    res.status(200).json({ message: 'User and associated profile deleted successfully' });
  } catch (err: any) {
    logMessage('error', `User deletion error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ message: 'Internal server error during user deletion' });
  }
});

export default router;