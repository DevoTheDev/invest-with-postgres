import { Router, Response } from 'express';
import { Request } from '../../types/express';
import { AppDataSource } from '../../data-source';
import { Investor } from '../../entities/Investor-Entities/Investor';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();
const investorRepo = AppDataSource.getRepository(Investor);

// POST /api/investors
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await AppDataSource.getRepository('User').findOneBy({ _id: req.user?._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingInvestor = await investorRepo.findOneBy({ user_id: user.id });
    if (existingInvestor) {
      return res.status(400).json({ message: 'Investor already exists for this user' });
    }

    const investor = investorRepo.create({ user_id: user.id });
    await investorRepo.save(investor);

    return res.status(201).json({ message: 'Investor created', investor });
  } catch (error) {
    console.error('Error creating investor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/investors/:userId
router.get('/:userId', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await AppDataSource.getRepository('User').findOneBy({ _id: req.user?._id });
    if (!user || user.id !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only access your own investor data' });
    }

    const investor = await investorRepo.findOne({
      where: { user_id: userId },
      relations: ['watchlists', 'watchlists.tickers', 'investments'],
    });

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    return res.json({ investor });
  } catch (error) {
    console.error('Error fetching investor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;