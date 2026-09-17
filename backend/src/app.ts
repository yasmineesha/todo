import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';   // ← otomatis baca index.ts
import { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend Todo Praktikum Belajar Mulus!' });
});

app.use('/api', apiRoutes);

// 404 Handler — WAJIB di paling bawah
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan!'
  });
});

export default app;