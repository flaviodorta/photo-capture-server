import * as ImageRepository from '../repositories/image.repository';
import { Image } from '../entities/image.entity';

export const getPanelData = async () => {
  const participations = await ImageRepository.getParticipationCounts();
  const images = await ImageRepository.getAllImages();

  return {
    participationsPerDay: participations.map((p) => ({
      date: p.day.toISOString().split('T')[0],
      count: parseInt(p.count),
    })),
    images: images.map((img) => ({
      id: img.id,
      url: `${process.env.SERVER_URL}/image/${img.id}`,
      createdAt: img.createdAt.toISOString(),
    })),
  };
};

export const saveImage = async (file: Express.Multer.File) => {
  const image = new Image();
  image.data = file.buffer;
  image.mimetype = file.mimetype;
  image.filename = file.originalname;
  image.createdAt = new Date();

  const saved = await ImageRepository.save(image);

  return {
    id: saved.id,
    url: `${process.env.SERVER_URL}/image/${saved.id}`,
  };
};

export const getImageById = async (id: number) => {
  return ImageRepository.findById(id);
};
