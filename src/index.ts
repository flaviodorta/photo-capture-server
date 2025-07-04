import express from 'express';
import multer from 'multer';
import { Image } from './entities/image.entity';
import { DataSource } from 'typeorm';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'photo_capture',
  synchronize: true,
  entities: [Image],
});

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
const upload = multer();

AppDataSource.initialize().then(() => {
  app.get('/panel', async (req, res) => {
    const repo = AppDataSource.getRepository(Image);

    // Quantidade de imagens por dia
    const participations = await repo
      .createQueryBuilder('image')
      .select("DATE_TRUNC('day', image.createdAt)", 'day')
      .addSelect('COUNT(*)', 'count')
      .groupBy("DATE_TRUNC('day', image.createdAt)")
      .orderBy('day', 'DESC')
      .getRawMany();

    // Lista de todas as imagens com link
    const images = await repo.find();

    const result = {
      participationsPerDay: participations.map((p) => ({
        date: p.day.toISOString().split('T')[0],
        count: parseInt(p.count),
      })),
      images: images.map((img) => ({
        id: img.id,
        url: `http://${process.env.HOST_IP}:4000/image/${img.id}`,
        createdAt: img.createdAt.toISOString(),
      })),
    };

    console.log('Participations:', participations);
    console.log('Images:', images);

    res.json(result);
  });

  app.post(
    '/upload',
    upload.single('image'),
    async (req, res): Promise<void> => {
      if (!req.file) {
        res.status(400).send('No file uploaded');
        return;
      }

      const image = new Image();
      image.data = req.file.buffer;
      image.mimetype = req.file.mimetype;
      image.filename = req.file.originalname;
      image.createdAt = new Date();

      const saved = await AppDataSource.getRepository(Image).save(image);

      res.json({
        id: saved.id,
        url: `http://${process.env.HOST_IP}:4000/image/${saved.id}`,
      });
    }
  );

  app.get('/image/:id', async (req, res): Promise<void> => {
    const image = await AppDataSource.getRepository(Image).findOneBy({
      id: parseInt(req.params.id),
    });

    if (!image) res.status(404).send('Not found');

    res.setHeader('Content-Type', image.mimetype);
    res.send(image.data);
  });

  app.listen(4000, () => console.log('Servidor rodando na porta 4000'));
});
