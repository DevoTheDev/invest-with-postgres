import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { Profile } from '../entities/Profile';
import { AppDataSource } from '../data-source';
import { getSecret } from '../utils/GetSecret';
import { Request } from '../types/express';
import { Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(Profile);

// ------------------------- REGISTER -------------------------
router.post('/register', async (req, res): Promise<void> => {
  const JWT_SECRET = await getSecret('jwt_secret');
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ message: 'Email and password are required and must be strings.' });
      return;
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(newUser);

    // Create default profile
    const newProfile = profileRepository.create({
      user_id: parseInt(String(newUser._id), 10),
      firstName: null,
      lastName: null,
      phoneNumber: null,
      birthday: null,
    });
    await profileRepository.save(newProfile);

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// ------------------------- LOGIN -------------------------
router.post('/login', async (req, res): Promise<void> => {
  const JWT_SECRET = await getSecret('jwt_secret');
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ message: 'Email and password are required and must be strings.' });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// ------------------------- REFRESH TOKEN -------------------------
router.post('/refresh', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const JWT_SECRET = await getSecret('jwt_secret');
  try {
    const userId = req.user?._id;
    const email = req.user?.email;

    if (!userId || !email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await userRepository.findOne({ where: { _id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newToken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Token refreshed successfully.',
      token: newToken,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({ message: 'Internal server error during token refresh.' });
  }
});

export default router;