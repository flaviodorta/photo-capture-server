import { DataSource } from 'typeorm';
import { Image } from './entities/image.entity';

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
