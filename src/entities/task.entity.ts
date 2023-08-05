import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Directory } from './directories.entity';
import { User } from './user.entity';
import { TaskStatus } from './task-status.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Directory, (directory) => directory.user)
  directory: Directory[];

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToMany(() => TaskStatus, (taskStatus) => taskStatus.task)
  status: TaskStatus[];
}
