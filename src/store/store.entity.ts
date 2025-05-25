import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  description?: string;
}
