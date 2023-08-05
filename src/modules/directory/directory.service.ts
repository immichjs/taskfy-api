import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directory } from 'src/entities/directories.entity';
import { Repository } from 'typeorm';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
  ) {}

  async findAllDirectories(): Promise<Directory[]> {
    return this.directoryRepository.find();
  }

  async findOneDirectory(id: string): Promise<Directory> {
    const directory = await this.directoryRepository.findOne({ where: { id } });

    if (!directory) {
      throw new NotFoundException('Diretório não encontrado.');
    }

    return directory;
  }

  async createDirectory({
    title,
    description,
    user,
  }: CreateDirectoryDto): Promise<Directory> {
    const directory = await this.directoryRepository.create({
      title,
      description,
      user,
    });

    return this.directoryRepository.save(directory);
  }

  async updateDirectory(
    userId: string,
    directoryId: string,
    { title, description }: UpdateDirectoryDto,
  ): Promise<Directory> {
    const hasDirectory = await this.directoryRepository.findOne({
      where: { id: directoryId },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
        },
      },
    });

    if (!hasDirectory) {
      throw new NotFoundException('Diretório não encontrado.');
    }

    if (hasDirectory.user.id !== userId) {
      throw new BadRequestException(
        'Esse diretório não pertence a esse usuário.',
      );
    }

    await this.directoryRepository.update(directoryId, {
      title,
      description,
    });

    const directory = await this.directoryRepository.findOne({
      where: { id: directoryId },
    });

    return directory;
  }

  async deleteDirectory(id: string): Promise<void> {
    const hasDirectory = await this.directoryRepository.count({
      where: { id },
    });

    if (!hasDirectory) {
      throw new NotFoundException('Diretório não encontrado.');
    }

    await this.directoryRepository.delete({ id });
  }
}
