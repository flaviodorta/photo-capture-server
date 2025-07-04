import { Request, Response } from 'express';
import * as ImageService from '../services/image.service';

export const getPanelData = async (req: Request, res: Response) => {
  const data = await ImageService.getPanelData();
  res.json(data);
};

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const result = await ImageService.saveImage(req.file);
  res.json(result);
};

export const getImageById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const image = await ImageService.getImageById(parseInt(req.params.id));
  if (!image) return res.status(404).send('Not found');

  res.setHeader('Content-Type', image.mimetype);
  res.send(image.data);
};
