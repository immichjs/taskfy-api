import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAllTasks(): Promise<Task[]> {
    return this.taskService.findAllTasks();
  }

  @Get('user/:id')
  async findAllTasksByUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Task[]> {
    return this.taskService.findAllTasksByUser(id);
  }

  @Get('user/:userId/:taskId')
  async findOneTasksByUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ): Promise<Task> {
    return this.taskService.findOneTaskByUser(userId, taskId);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('user/:userId/:taskId')
  async updateTask(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(userId, taskId, updateTaskDto);
  }

  @Delete('user/:userId/:taskId')
  async deleteTask(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ): Promise<void> {
    return this.taskService.deleteTask(userId, taskId);
  }
}
