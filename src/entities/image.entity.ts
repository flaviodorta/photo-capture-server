import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  data: Buffer;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @CreateDateColumn()
  createdAt: Date;
}
