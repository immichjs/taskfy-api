import {
  IsDate,
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Directory } from 'src/entities/directories.entity';
import { User } from 'src/entities/user.entity';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Título não pode ser vazio.' })
  @IsString({ message: 'Título precisa ser uma string.' })
  title: string;

  @IsNotEmpty({ message: 'Descrição não pode ser vazio.' })
  @IsString({ message: 'Descrição precisa ser uma string.' })
  description: string;

  @IsOptional()
  @IsDateString()
  deadline: Date;

  @IsNotEmpty({ message: 'Usuário não pode ser vazio.' })
  @IsUUID('4', { message: 'Usuário vinculado incorretamente.' })
  user: User;

  @IsNotEmpty({ message: 'Diretório não pode ser vazio.' })
  @IsUUID('4', { message: 'Diretório vinculado incorretamente.' })
  directory: Directory;
}
