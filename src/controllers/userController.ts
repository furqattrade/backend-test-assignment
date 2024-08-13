import { Router, Request, Response } from 'express';
import { deductUserBalance } from '../services/userService';
import { deductBalanceValidator } from '../validators/users-deduct-balance-request';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.post('/deduct-balance',validateRequest(deductBalanceValidator), async (req: Request, res: Response) => {
  const { userId, amount }: { userId: number; amount: number } = req.body;
  try {
    const newBalance = await deductUserBalance(userId, amount);
    res.json({ success: true, newBalance });
  } catch (error) {
    res.status(400).json({ error: `Failed to deduct balance : ${error}` });
  }
});

export default router;
