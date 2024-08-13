import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

export default function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const originalJson = res.json.bind(res);

  res.json = (body) => {
    cache.set(key, body);
    return originalJson(body);
  };

  next();
}
