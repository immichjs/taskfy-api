import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('task_status')
export class TaskStatus {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  status: string;

  @ManyToOne(() => Task, (task) => task.status)
  task: Task;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
