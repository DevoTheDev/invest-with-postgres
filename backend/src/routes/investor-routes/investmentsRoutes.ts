import express, { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import { Investor, Investment } from '../../entities/Investor-Entities/Investor';
import { Request } from '../../types/express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { IsUUID, validate, IsNumber, IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { plainToClass, Type } from 'class-transformer';
import { logMessage } from '../../utils/logger';
import crypto from 'crypto';

const router = express.Router();
const investorRepository = AppDataSource.getRepository(Investor);

// DTO aligned with Investment type
export class InvestmentDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  ticker?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  purchase_price?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  purchase_date?: Date;

}

// Get All Investments
const getInvestments: RequestHandler = async (req: Request, res) => {
  try {
    const userId = req.user!.id;
    const investor = await investorRepository.findOne({ where: { user_id: userId } });

    if (!investor) {
      logMessage('info', `Investor not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }

    logMessage('info', `Investments retrieved for user_id: ${userId}`);
    res.status(200).json({ message: 'Investments retrieved', data: { investments: investor.investments ?? [] } });
  } catch (error: any) {
    logMessage('error', `Error fetching investments: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add Investment with duplicate ticker check
const addInvestment: RequestHandler = async (req: Request, res) => {
  try {
    const userId = req.user!.id;
    const dto = plainToClass(InvestmentDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for investment addition');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    const investor = await investorRepository.findOne({ where: { user_id: userId } });
    if (!investor) {
      logMessage('info', `Investor not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor not found' });
      return;
    }

    // 🚨 Check for duplicate ticker
    const duplicate = investor.investments?.find(
      (investment) => investment.ticker.toLowerCase() === (dto.ticker ?? '').toLowerCase()
    );
    if (duplicate) {
      logMessage('warning', `Duplicate investment ticker '${dto.ticker}' for user_id: ${userId}`);
      res.status(400).json({ message: `Investment with ticker '${dto.ticker}' already exists.` });
      return;
    }

    const newInvestment: Investment = {
      id: dto.id ?? crypto.randomUUID(),
      ticker: dto.ticker ?? '',
      quantity: dto.quantity ?? 0,
      purchase_price: dto.purchase_price ?? 0,
      purchase_date: dto.purchase_date ?? new Date(),
    };

    investor.investments = investor.investments ? [...investor.investments, newInvestment] : [newInvestment];
    const updatedInvestor = await investorRepository.save(investor);

    logMessage('info', `Investment added for user_id: ${userId}`);
    res.status(201).json({ message: 'Investment added', data: { investments: updatedInvestor.investments } });
  } catch (error: any) {
    logMessage('error', `Error adding investment: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update Investment
const updateInvestment: RequestHandler = async (req: Request, res) => {
  try {
    const userId = req.user!.id;
    const { investmentId } = req.params;
    const dto = plainToClass(InvestmentDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      logMessage('error', 'Validation failed for investment update');
      res.status(400).json({ message: 'Validation failed', data: { errors } });
      return;
    }

    const investor = await investorRepository.findOne({ where: { user_id: userId } });
    if (!investor || !investor.investments) {
      logMessage('info', `Investor or investments not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor or investments not found' });
      return;
    }

    const investmentIndex = investor.investments.findIndex(inv => inv.id === investmentId);
    if (investmentIndex === -1) {
      logMessage('info', `Investment not found with id: ${investmentId}`);
      res.status(404).json({ message: 'Investment not found' });
      return;
    }

    investor.investments[investmentIndex] = {
      ...investor.investments[investmentIndex],
      ...dto,
    };

    const updatedInvestor = await investorRepository.save(investor);
    logMessage('info', `Investment updated for user_id: ${userId}, investmentId: ${investmentId}`);
    res.status(200).json({ message: 'Investment updated', data: { investment: updatedInvestor.investments[investmentIndex] } });
  } catch (error: any) {
    logMessage('error', `Error updating investment: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Investment
const deleteInvestment: RequestHandler = async (req: Request, res) => {
  try {
    const userId = req.user!.id;
    const { investmentId } = req.params;

    const investor = await investorRepository.findOne({ where: { user_id: userId } });
    if (!investor || !investor.investments) {
      logMessage('info', `Investor or investments not found for user_id: ${userId}`);
      res.status(404).json({ message: 'Investor or investments not found' });
      return;
    }

    const updatedInvestments = investor.investments.filter(inv => inv.id !== investmentId);
    if (updatedInvestments.length === investor.investments.length) {
      logMessage('info', `Investment not found with id: ${investmentId}`);
      res.status(404).json({ message: 'Investment not found' });
      return;
    }

    investor.investments = updatedInvestments;
    const updatedInvestor = await investorRepository.save(investor);

    logMessage('info', `Investment deleted for user_id: ${userId}, investmentId: ${investmentId}`);
    res.status(200).json({ message: 'Investment deleted', data: { investments: updatedInvestor.investments } });
  } catch (error: any) {
    logMessage('error', `Error deleting investment: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.get('/', authMiddleware, getInvestments);
router.post('/', authMiddleware, addInvestment);
router.put('/:investmentId', authMiddleware, updateInvestment);
router.delete('/:investmentId', authMiddleware, deleteInvestment);

export default router;
