import { Module } from '@nestjs/common';
import { DirectoryController } from './directory.controller';
import { DirectoryService } from './directory.service';
import { Directory } from 'src/entities/directories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Directory])],
  controllers: [DirectoryController],
  providers: [DirectoryService],
})
export class DirectoryModule {}
