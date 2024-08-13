import { Request, Response } from 'express';

export default function errorMiddleware(err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}
