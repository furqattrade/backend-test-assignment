import { Router, Request, Response } from 'express';
import { deductUserBalance } from '../services/userService';

const router = Router();

router.post('/deduct-balance', async (req: Request, res: Response) => {
  const { userId, amount }: { userId: number; amount: number } = req.body;
  try {
    const newBalance = await deductUserBalance(userId, amount);
    res.json({ success: true, newBalance });
  } catch (error) {
    res.status(400).json({ error: `Failed to deduct balance : ${error}` });
  }
});

export default router;
