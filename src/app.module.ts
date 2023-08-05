import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './entities/user.entity';
import { Directory } from './entities/directories.entity';
import { Task } from './entities/task.entity';
import { TaskStatus } from './entities/task-status.entity';
import { DirectoryController } from './modules/directory/directory.controller';
import { DirectoryModule } from './modules/directory/directory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'taskfy',
      entities: [User, Directory, Task, TaskStatus],
      synchronize: true,
    }),
    UserModule,
    DirectoryModule,
  ],
})
export class AppModule {}
