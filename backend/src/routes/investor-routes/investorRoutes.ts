import express, { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import { Investor, InvestmentGoal, RiskTolerance, ExperienceLevel } from '../../entities/Investor-Entities/Investor';
import { Request } from '../../types/express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { IsUUID, validate } from 'class-validator';
import { IsEnum, IsOptional, IsNumber, IsBoolean, IsArray, } from 'class-validator';
import { clarity } from '../../utils/clarity';

const router = express.Router();
const investorRepository = AppDataSource.getRepository(Investor);

export class InvestorDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEnum(InvestmentGoal)
  @IsOptional()
  investment_goal?: InvestmentGoal;

  @IsEnum(RiskTolerance)
  @IsOptional()
  risk_tolerance?: RiskTolerance;

  @IsEnum(ExperienceLevel)
  @IsOptional()
  experience_level?: ExperienceLevel;

  @IsNumber()
  @IsOptional()
  annual_investment_budget?: number;

  @IsBoolean()
  @IsOptional()
  auto_invest_enabled?: boolean;

}


// Get Investor
const getInvestor: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;
    const investor = await investorRepository.findOne({
      where: { user_id: userId },
    });

    if (!investor) {
      clarity(`Investor not found for user_id:`, userId);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }

    clarity(`Investor retrieved for user_id: ${userId}`, investor);
    res.status(200).json({ message: 'Investor retrieved', data: { investor } });
  } catch (error: any) {
    clarity(`Error fetching investor: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Investor
const updateInvestor: RequestHandler = async (req: Request, res): Promise<void> => {
  try {
    const userId = req.user!.id;

    const investor = await investorRepository.findOne({ where: { user_id: userId } });
    if (!investor) {
      clarity(`Investor not found for user_id:`, userId);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }
    clarity(`Investor before UPDATE for user_id: ${userId}`, investor);
    investorRepository.merge(investor, {
      investment_goal: req.body.investment_goal ?? investor.investment_goal,
      risk_tolerance: req.body.risk_tolerance ?? investor.risk_tolerance,
      experience_level: req.body.experience_level ?? investor.experience_level,
      annual_investment_budget: req.body.annual_investment_budget ?? investor.annual_investment_budget,
      auto_invest_enabled: req.body.auto_invest_enabled ?? investor.auto_invest_enabled,
    });

    const updatedInvestor = await investorRepository.save(investor);
    clarity(`Investor updated for user_id: ${userId}`, updatedInvestor);
    res.status(200).json({ message: 'Investor updated', data: { updatedInvestor } });
  } catch (error: any) {
    clarity(`Error updating investor: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/', authMiddleware, getInvestor);
router.put('/', authMiddleware, updateInvestor);

export default router;