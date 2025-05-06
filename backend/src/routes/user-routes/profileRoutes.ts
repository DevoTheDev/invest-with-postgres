import { Router, Response } from 'express';
import { Request } from '../../types/express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Profile } from '../../entities/Profile';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { authMiddleware } from '../../middleware/authMiddleware';
import { IsString, IsOptional, IsEmail, Matches, IsEnum, IsBoolean, IsObject } from 'class-validator';
import { logMessage } from '../../utils/logger';
import { ThemePreference, LanguageOption } from '../../types/shared/shared-types';

class ProfileDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,50}$/, { message: 'Username must be 3-50 characters and contain only letters, numbers, or underscores' })
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsEnum(ThemePreference)
  @IsOptional()
  themePreference?: ThemePreference;

  @IsEnum(LanguageOption)
  @IsOptional()
  language?: LanguageOption;

  @IsObject()
  @IsOptional()
  notifications?: { email: boolean; push: boolean };

  @IsObject()
  @IsOptional()
  dataUsage?: { backgroundSync: boolean; activityLogs: boolean };

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
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

    const existingProfile = await profileRepo.findOne({ where: { id: userId } });
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
    profile.id = userId;
    profile.name = dto.name ?? '';
    profile.email = dto.email ?? '';
    profile.username = dto.username ?? '';
    profile.bio = dto.bio ?? undefined;
    profile.avatarUrl = dto.avatarUrl ?? undefined;
    profile.themePreference = dto.themePreference ?? ThemePreference.System;
    profile.language = dto.language ?? LanguageOption.En;
    profile.notifications = dto.notifications ?? { email: true, push: true };
    profile.dataUsage = dto.dataUsage ?? { backgroundSync: false, activityLogs: false };
    profile.isEmailVerified = dto.isEmailVerified ?? false;
    profile.isActive = dto.isActive ?? true;
    profile.created_at = new Date().toISOString();
    profile.updated_at = new Date().toISOString();

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

    if (req.user?._id !== userId) {
      logMessage('error', `Unauthorized access to profile for user_id: ${userId}`);
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const profile = await profileRepo.findOne({ where: { id: userId } });
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

    const profile = await profileRepo.findOne({ where: { id: userId } });
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

    profile.name = dto.name ?? profile.name;
    profile.email = dto.email ?? profile.email;
    profile.username = dto.username ?? profile.username;
    profile.bio = dto.bio ?? profile.bio;
    profile.avatarUrl = dto.avatarUrl ?? profile.avatarUrl;
    profile.themePreference = dto.themePreference ?? profile.themePreference;
    profile.language = dto.language ?? profile.language;
    profile.notifications = dto.notifications ?? profile.notifications;
    profile.dataUsage = dto.dataUsage ?? profile.dataUsage;
    profile.isEmailVerified = dto.isEmailVerified ?? profile.isEmailVerified;
    profile.isActive = dto.isActive ?? profile.isActive;
    profile.updated_at = new Date().toISOString();

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

    const profile = await profileRepo.findOne({ where: { id: userId } });
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