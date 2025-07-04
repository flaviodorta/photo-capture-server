import { AppDataSource } from '../data-source';
import { Image } from '../entities/image.entity';

export const getParticipationCounts = async () => {
  return AppDataSource.getRepository(Image)
    .createQueryBuilder('image')
    .select("DATE_TRUNC('day', image.createdAt)", 'day')
    .addSelect('COUNT(*)', 'count')
    .groupBy("DATE_TRUNC('day', image.createdAt)")
    .orderBy('day', 'DESC')
    .getRawMany();
};

export const getAllImages = async () => {
  return AppDataSource.getRepository(Image).find();
};

export const findById = async (id: number) => {
  return AppDataSource.getRepository(Image).findOneBy({ id });
};

export const save = async (image: Image) => {
  return AppDataSource.getRepository(Image).save(image);
};
