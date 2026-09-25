import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import apiRoutes from './routes';   // ← otomatis baca index.ts
import { Request, Response, NextFunction } from 'express';
import { sendError, sendSuccess } from './utils/response';

const app = express();

app.use(cors({ exposedHeaders: ['X-Request-Id'] }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID();
  res.locals.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${res.locals.requestId}] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());

app.get('/', (req, res) => {
  sendSuccess(res, 'Backend Todo Praktikum Belajar Mulus!');
});

app.use('/api', apiRoutes);

app.use((req: Request, res: Response) => {
  sendError(res, `Route ${req.method} ${req.url} tidak ditemukan!`, 404);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (res.headersSent) {
    next(error);
    return;
  }

  sendError(res, 'Terjadi kesalahan pada server.', 500);
});

export default app;