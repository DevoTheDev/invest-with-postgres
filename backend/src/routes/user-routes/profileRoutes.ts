import express, { RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Profile } from '../../entities/Profile';
import { Request } from '../../types/express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { IsString, IsOptional, IsEmail, Matches, IsEnum, IsBoolean, IsObject } from 'class-validator';
import { clarity } from '../../utils/clarity';
import { ThemePreference, LanguageOption } from '../../types/shared/shared-types';

const router = express.Router();
const profileRepository: Repository<Profile> = AppDataSource.getRepository(Profile);

export class ProfileDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,50}$/, {
    message: 'Username must be 3-50 characters and contain only letters, numbers, or underscores',
  })
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

  @IsString()
  @IsOptional()
  phone?: string;

  @IsObject()
  @IsOptional()
  notifications?: { email: boolean; push: boolean };

  @IsObject()
  @IsOptional()
  dataUsage?: { backgroundSync: boolean; activityLogs: boolean };

  // Intentionally excluding isEmailVerified and isActive from client updates
}

const getProfile: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;

    if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      clarity('Invalid UUID format', userId);
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    // Query by user_id instead of id
    const profile = await profileRepository.findOne({ where: { user_id: userId } });

    if (!profile) {
      clarity(`Profile not found for user_id: ${userId}`, userId);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    clarity(`Profile retrieved for user_id: ${userId}`, profile);
    res.status(200).json({ message: 'Profile retrieved', data: { profile } });
  } catch (error: any) {
    clarity(`Error retrieving profile: ${error.message}`,{ stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile: RequestHandler = async (req: Request, res): Promise<void> => {
  console.log('OBJECT received by PUT route on Request Body:', req.body);
  try {
    const userId = req.user!.id;

    if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      clarity('Invalid UUID format', userId);
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }

    // Query by user_id instead of id
    const profile = await profileRepository.findOne({ where: { user_id: userId } });

    if (!profile) {
      clarity(`Profile not found for user_id: ${userId}`, userId);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    const dto = plainToClass(ProfileDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      clarity("Mismatch between Request body and Profile DTO", { errors });
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    if (dto.email && dto.email !== profile.email) {
      const existingEmail = await profileRepository.findOne({ where: { email: dto.email } });
      if (existingEmail) {
        clarity(`Email ${dto.email} already taken`, existingEmail);
        res.status(400).json({ message: 'Email already taken' });
        return;
      }
    }

    clarity(`Former profile object for user_id: ${userId}`, profile);

    profileRepository.merge(profile, {
      name: dto.name ?? profile.name,
      email: dto.email ?? profile.email,
      username: dto.username ?? profile.username,
      bio: dto.bio ?? profile.bio,
      phone: dto.phone ?? profile.phone,
      avatarUrl: dto.avatarUrl ?? profile.avatarUrl,
      themePreference: dto.themePreference ?? profile.themePreference,
      language: dto.language ?? profile.language,
      notifications: dto.notifications ?? profile.notifications,
      dataUsage: dto.dataUsage ?? profile.dataUsage,
      updated_at: new Date(),
    });

    const updatedProfile = await profileRepository.save(profile);
    clarity(`Profile updated for user_id: ${userId}`, updatedProfile);
    res.status(200).json({ message: 'Profile updated', data: { updatedProfile } });
  } catch (error: any) {
    clarity(`Error updating profile: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);

export default router;
