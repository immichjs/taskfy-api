import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async findAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findAllTasksByUser(userId: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async findOneTask(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async findOneTaskByUser(userId: string, taskId: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });
  }

  async createTask({
    title,
    description,
    deadline,
    directory,
    user,
  }: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create({
      title,
      description,
      deadline: new Date(deadline),
      directory,
      user,
    });

    return this.taskRepository.save(task);
  }

  async updateTask(
    userId: string,
    taskId: string,
    { title, description, deadline }: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (deadline) task.deadline = deadline;

    await this.taskRepository.save(task);

    return this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    const task = this.taskRepository.count({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    await this.taskRepository.delete({ id: taskId });
  }
}
