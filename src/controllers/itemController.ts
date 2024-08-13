import { Router, Request, Response } from 'express';
import { getItems } from '../services/itemService';
import cacheMiddleware from '../middlewares/cacheMiddleware';

const router = Router();

router.get('/', cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch items: ${error}` });
  }
});

export default router;
