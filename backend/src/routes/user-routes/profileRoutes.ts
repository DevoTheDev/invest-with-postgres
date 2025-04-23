import { Router, Response } from 'express';
import { Request } from '../../types/express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Profile } from '../../entities/Profile';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { authMiddleware } from '../../middleware/authMiddleware';
import { IsString, IsOptional, Matches, IsDateString } from 'class-validator';
import { logMessage } from '../../utils/logger';

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
  birthday?: Date | string | null;
}

const router = Router();
const profileRepo: Repository<Profile> = AppDataSource.getRepository(Profile);

// POST /api/profiles
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      logMessage('error', 'Invalid user ID');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const existingProfile = await profileRepo.findOneBy({ user_id: userId });
    if (existingProfile) {
      logMessage('error', `Profile already exists for user_id: ${userId}`);
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for profile creation');
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const profile = new Profile();
    profile.user_id = userId;
    profile.firstName = dto.firstName ?? null;
    profile.lastName = dto.lastName ?? null;
    profile.phoneNumber = dto.phoneNumber ?? null;
    profile.birthday = dto.birthday ? new Date(dto.birthday) : null;

    await profileRepo.save(profile);
    logMessage('info', `Profile created for user_id: ${userId}`);
    return res.status(201).json({ message: 'Profile created', profile });
  } catch (error: any) {
    logMessage('error', `Error creating profile: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/profiles/:userId
router.get('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.userId;
    if (!userId || typeof userId !== 'string') {
      logMessage('error', 'Invalid user ID format');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Ensure the requesting user matches the profile's user_id (optional security)
    if (req.user?._id !== userId) {
      logMessage('error', `Unauthorized access to profile for user_id: ${userId}`);
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const profile = await profileRepo.findOneBy({ user_id: userId });
    if (!profile) {
      logMessage('info', `Profile not found for user_id: ${userId}`);
      return res.status(404).json({ message: 'Profile not found' });
    }

    logMessage('info', `Profile retrieved for user_id: ${userId}`);
    return res.status(200).json({ message: 'Profile retrieved', profile });
  } catch (error: any) {
    logMessage('error', `Error retrieving profile: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/profiles/:userId
router.put('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.userId;
    if (!userId || typeof userId !== 'string') {
      logMessage('error', 'Invalid user ID format');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (userId !== req.user?._id) {
      logMessage('error', `Forbidden: Attempt to update profile for user_id: ${userId}`);
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }

    const profile = await profileRepo.findOneBy({ user_id: userId });
    if (!profile) {
      logMessage('info', `Profile not found for user_id: ${userId}`);
      return res.status(404).json({ message: 'Profile not found' });
    }

    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for profile update');
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    profile.firstName = dto.firstName ?? profile.firstName;
    profile.lastName = dto.lastName ?? profile.lastName;
    profile.phoneNumber = dto.phoneNumber ?? profile.phoneNumber;
    profile.birthday = dto.birthday ? new Date(dto.birthday) : profile.birthday;

    await profileRepo.save(profile);
    logMessage('info', `Profile updated for user_id: ${userId}`);
    return res.status(200).json({ message: 'Profile updated', profile });
  } catch (error: any) {
    logMessage('error', `Error updating profile: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/profiles/:userId
router.delete('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.userId;
    if (!userId || typeof userId !== 'string') {
      logMessage('error', 'Invalid user ID format');
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (userId !== req.user?._id) {
      logMessage('error', `Forbidden: Attempt to delete profile for user_id: ${userId}`);
      return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
    }

    const profile = await profileRepo.findOneBy({ user_id: userId });
    if (!profile) {
      logMessage('info', `Profile not found for user_id: ${userId}`);
      return res.status(404).json({ message: 'Profile not found' });
    }

    await profileRepo.remove(profile);
    logMessage('info', `Profile deleted for user_id: ${userId}`);
    return res.status(200).json({ message: 'Profile deleted' });
  } catch (error: any) {
    logMessage('error', `Error deleting profile: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;