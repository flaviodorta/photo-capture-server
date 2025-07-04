import express from 'express';
import multer from 'multer';
import cors from 'cors';
import imageRoutes from './routes/image.routes';

import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use('/', imageRoutes);

AppDataSource.initialize().then(() => {
  app.listen(4000, '0.0.0.0', () =>
    console.log('Servidor rodando na porta 4000')
  );
});
