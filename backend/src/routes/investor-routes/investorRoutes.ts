import express, { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import { Investor, InvestmentGoal, RiskTolerance, ExperienceLevel, AssetClass } from '../../entities/Investor-Entities/Investor';
import { Profile } from '../../entities/Profile';
import { Request } from '../../types/express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { logMessage } from '../../utils/logger';

const router = express.Router();
const investorRepository = AppDataSource.getRepository(Investor);
const profileRepository = AppDataSource.getRepository(Profile);

class InvestorDTO {
  @IsEnum(InvestmentGoal)
  @IsOptional()
  investment_goal?: InvestmentGoal;

  @IsEnum(RiskTolerance)
  @IsOptional()
  risk_tolerance?: RiskTolerance;

  @IsEnum(ExperienceLevel)
  @IsOptional()
  experience_level?: ExperienceLevel;

  @IsArray()
  @IsEnum(AssetClass, { each: true })
  @IsOptional()
  preferred_asset_classes?: AssetClass[];

  @IsNumber()
  @IsOptional()
  annual_investment_budget?: number;

  @IsBoolean()
  @IsOptional()
  auto_invest_enabled?: boolean;
}

// Create Investor
const createInvestor: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const dto = plainToClass(InvestorDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for investor creation');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    const profile = await profileRepository.findOne({ where: { id: userId } });
    if (!profile) {
      logMessage('error', `Profile not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    const existingInvestor = await investorRepository.findOne({ where: { user_id: userId } });
    if (existingInvestor) {
      logMessage('error', `Investor already exists for user_id: ${userId}`);
      res.status(400).json({ message: 'Investor already exists for this user' });
      return;
    }

    const investor = investorRepository.create({
      user_id: userId,
      profile_id: profile.id,
      user: req.user!,
      profile,
      investment_goal: dto.investment_goal ?? InvestmentGoal.LONG_TERM_GROWTH,
      risk_tolerance: dto.risk_tolerance ?? RiskTolerance.MEDIUM,
      experience_level: dto.experience_level ?? ExperienceLevel.BEGINNER,
      preferred_asset_classes: dto.preferred_asset_classes ?? [],
      annual_investment_budget: dto.annual_investment_budget ?? 0,
      auto_invest_enabled: dto.auto_invest_enabled ?? false,
    });

    const savedInvestor = await investorRepository.save(investor);
    logMessage('info', `Investor created for user_id: ${userId}`);
    res.status(201).json({ message: 'Investor created', data: { investor: savedInvestor } });
  } catch (error: any) {
    logMessage('error', `Error creating investor: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Investor
const getInvestor: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const investor = await investorRepository.findOne({
      where: { user_id: userId },
      relations: ['user', 'profile'],
    });

    if (!investor) {
      logMessage('info', `Investor not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }

    logMessage('info', `Investor retrieved for user_id: ${userId}`);
    res.status(200).json({ message: 'Investor retrieved', data: { investor } });
  } catch (error: any) {
    logMessage('error', `Error fetching investor: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Investor
const updateInvestor: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const dto = plainToClass(InvestorDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for investor update');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    const investor = await investorRepository.findOne({ where: { user_id: userId } });
    if (!investor) {
      logMessage('info', `Investor not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }

    investorRepository.merge(investor, {
      investment_goal: dto.investment_goal ?? investor.investment_goal,
      risk_tolerance: dto.risk_tolerance ?? investor.risk_tolerance,
      experience_level: dto.experience_level ?? investor.experience_level,
      preferred_asset_classes: dto.preferred_asset_classes ?? investor.preferred_asset_classes,
      annual_investment_budget: dto.annual_investment_budget ?? investor.annual_investment_budget,
      auto_invest_enabled: dto.auto_invest_enabled ?? investor.auto_invest_enabled,
    });

    const updatedInvestor = await investorRepository.save(investor);
    logMessage('info', `Investor updated for user_id: ${userId}`);
    res.status(200).json({ message: 'Investor updated', data: { investor: updatedInvestor } });
  } catch (error: any) {
    logMessage('error', `Error updating investor: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Investor
const deleteInvestor: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const investor = await investorRepository.findOne({ where: { user_id: userId } });
    if (!investor) {
      logMessage('info', `Investor not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }

    await investorRepository.remove(investor);
    logMessage('info', `Investor deleted for user_id: ${userId}`);
    res.status(200).json({ message: 'Investor deleted' });
  } catch (error: any) {
    logMessage('error', `Error deleting investor: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.post('/', authMiddleware, createInvestor);
router.get('/', authMiddleware, getInvestor);
router.put('/', authMiddleware, updateInvestor);
router.delete('/', authMiddleware, deleteInvestor);

export default router;