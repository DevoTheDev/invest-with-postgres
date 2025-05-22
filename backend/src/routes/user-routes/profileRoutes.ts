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
}

const router = Router();
const profileRepo: Repository<Profile> = AppDataSource.getRepository(Profile);

// Create Profile
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      logMessage('error', 'Unauthorized access to create profile');
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Convert request body to DTO and validate it
    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for profile creation');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    // Check if email or username already exists
    const existingProfile = await profileRepo.findOne({ where: [{ email: dto.email }, { username: dto.username }] });
    if (existingProfile) {
      logMessage('error', 'Profile with given email or username already exists');
      res.status(400).json({ message: 'Profile with given email or username already exists' });
      return;
    }

    // Create new profile, applying defaults when dto fields are missing
    const newProfile = profileRepo.create({
      id: userId,
      name: dto.name ?? "",                          // default empty string
      email: dto.email ?? "",                        // default empty string
      username: dto.username ?? "",                  // default empty string
      bio: dto.bio ?? "",                            // default empty string
      avatarUrl: dto.avatarUrl ?? "",                // default empty string
      themePreference: dto.themePreference ?? ThemePreference.System,  // default to 'system'
      language: dto.language ?? LanguageOption.En,   // default to 'en'
      notifications: dto.notifications ?? { email: false, push: false }, // default notifications off
      dataUsage: dto.dataUsage ?? { backgroundSync: false, activityLogs: false }, // default data usage off
      isActive: true,                                // active by default
      isEmailVerified: false,                        // not verified by default
      created_at: new Date(),                        // set creation date
      updated_at: new Date(),                        // set update date
    });

    const savedProfile = await profileRepo.save(newProfile);
    logMessage('info', `Profile created for user_id: ${userId}`);
    res.status(201).json({ message: 'Profile created', data: { profile: savedProfile } });
  } catch (error: any) {
    logMessage('error', `Error creating profile: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get Profile
router.get('/:userId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || !userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      logMessage('error', 'Invalid UUID format');
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    if (req.user?.id !== userId) {
      logMessage('error', `Unauthorized access to profile for user_id: ${userId}`);
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    const profile = await profileRepo.findOne({ where: { id: userId } });
    if (!profile) {
      logMessage('info', `Profile not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    logMessage('info', `Profile retrieved for user_id: ${userId}`);
    res.status(200).json({ message: 'Profile retrieved', data: { profile } });
  } catch (error: any) {
    logMessage('error', `Error retrieving profile: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Profile
router.put('/:userId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || !userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      logMessage('error', 'Invalid UUID format');
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    if (userId !== req.user?.id) {
      logMessage('error', `Forbidden: Attempt to update profile for user_id: ${userId}`);
      res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
      return;
    }

    const profile = await profileRepo.findOne({ where: { id: userId } });
    if (!profile) {
      logMessage('info', `Profile not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for profile update');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    if (dto.username && dto.username !== profile.username) {
      const existingUsername = await profileRepo.findOne({ where: { username: dto.username } });
      if (existingUsername) {
        logMessage('error', `Username ${dto.username} already taken`);
        res.status(400).json({ message: 'Username already taken' });
        return;
      }
    }

    if (dto.email && dto.email !== profile.email) {
      const existingEmail = await profileRepo.findOne({ where: { email: dto.email } });
      if (existingEmail) {
        logMessage('error', `Email ${dto.email} already taken`);
        res.status(400).json({ message: 'Email already taken' });
        return;
      }
    }

    profileRepo.merge(profile, {
      name: dto.name ?? profile.name,
      email: dto.email ?? profile.email,
      username: dto.username ?? profile.username,
      bio: dto.bio ?? profile.bio,
      avatarUrl: dto.avatarUrl ?? profile.avatarUrl,
      themePreference: dto.themePreference ?? profile.themePreference,
      language: dto.language ?? profile.language,
      notifications: dto.notifications ?? profile.notifications,
      dataUsage: dto.dataUsage ?? profile.dataUsage,
    });

    const updatedProfile = await profileRepo.save(profile);
    logMessage('info', `Profile updated for user_id: ${userId}`);
    res.status(200).json({ message: 'Profile updated', data: { profile: updatedProfile } });
  } catch (error: any) {
    logMessage('error', `Error updating profile: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Deactivate Profile (Soft Delete)
router.delete('/:userId', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || !userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      logMessage('error', 'Invalid UUID format');
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    if (userId !== req.user?.id) {
      logMessage('error', `Forbidden: Attempt to deactivate profile for user_id: ${userId}`);
      res.status(403).json({ message: 'Forbidden: You can only deactivate your own profile' });
      return;
    }

    const profile = await profileRepo.findOne({ where: { id: userId } });
    if (!profile) {
      logMessage('info', `Profile not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    profile.isActive = false;
    await profileRepo.save(profile);
    logMessage('info', `Profile deactivated for user_id: ${userId}`);
    res.status(200).json({ message: 'Profile deactivated' });
  } catch (error: any) {
    logMessage('error', `Error deactivating profile: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;