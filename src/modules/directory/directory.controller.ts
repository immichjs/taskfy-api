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
import { DirectoryService } from './directory.service';
import { Directory } from 'src/entities/directories.entity';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { CreateDirectoryDto } from './dto/create-directory.dto';

@Controller('directories')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get()
  async findAllDirectories(): Promise<Directory[]> {
    return this.directoryService.findAllDirectories();
  }

  @Get('/user/:id')
  async findAllDirectoriesByUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Directory[]> {
    return this.directoryService.findAllDirectoriesByUser(id);
  }

  @Get(':id')
  async findOneDirectory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Directory> {
    return this.directoryService.findOneDirectory(id);
  }

  @Post()
  async createDirectory(
    @Body() createDirectoryDto: CreateDirectoryDto,
  ): Promise<Directory> {
    return this.directoryService.createDirectory(createDirectoryDto);
  }

  @Patch(':userId/:directoryId')
  async updateDirectory(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('directoryId', new ParseUUIDPipe()) directoryId: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ): Promise<Directory> {
    return this.directoryService.updateDirectory(
      userId,
      directoryId,
      updateDirectoryDto,
    );
  }

  @Delete(':id')
  async deleteDirectory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.directoryService.deleteDirectory(id);
  }
}
