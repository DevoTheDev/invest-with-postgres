import { Router, Response } from 'express';
import { Request } from '../types/express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Profile } from '../entities/Profile';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { authMiddleware } from '../middleware/authMiddleware';
import { IsString, IsOptional, Matches, IsDateString } from 'class-validator';

class ProfileDTO {
  @IsString()
  @IsOptional()
  firstName?: string | null;

  @IsString()
  @IsOptional()
  lastName?: string | null;

  @IsString()
  @IsOptional()
  @Matches(/^\+?\d{10,15}$/, { message: 'phoneNumber must be a valid phone number' })
  phoneNumber?: string | null;

  @IsDateString()
  @IsOptional()
  birthday?: string | null;
}

const router = Router();
const profileRepo: Repository<Profile> = AppDataSource.getRepository(Profile);

// GET /api/profiles/:userId
router.get('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (userId !== req.user?._id) {
      return res.status(403).json({ message: 'Forbidden: You can only access your own profile' });
    }

    const profile = await profileRepo.findOne({
      where: { user_id: userId },
      relations: ['user'],
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json({
      user_id: profile.user_id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      birthday: profile.birthday,
      email: profile.user.email,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/profiles
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(String(req.user?._id), 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const existingProfile = await profileRepo.findOneBy({ user_id: userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const profile = new Profile();
    profile.user_id = userId;
    profile.firstName = dto.firstName ?? null;
    profile.lastName = dto.lastName ?? null;
    profile.phoneNumber = dto.phoneNumber ?? null;
    profile.birthday = dto.birthday ?? null;

    await profileRepo.save(profile);
    return res.status(201).json({ message: 'Profile created', profile });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/profiles/:userId
router.put('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (userId !== req.user?._id) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }

    const profile = await profileRepo.findOneBy({ user_id: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    profile.firstName = dto.firstName ?? profile.firstName;
    profile.lastName = dto.lastName ?? profile.lastName;
    profile.phoneNumber = dto.phoneNumber ?? profile.phoneNumber;
    profile.birthday = dto.birthday ?? profile.birthday;

    await profileRepo.save(profile);
    return res.json({ message: 'Profile updated', profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/profiles/:userId
router.delete('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (userId !== req.user?._id) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
    }

    const profile = await profileRepo.findOneBy({ user_id: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await profileRepo.remove(profile);
    return res.json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;