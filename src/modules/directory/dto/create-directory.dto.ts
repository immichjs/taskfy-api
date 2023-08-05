import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { User } from 'src/entities/user.entity';
export class CreateDirectoryDto {
  @IsNotEmpty({ message: 'Título não pode ser vazio.' })
  @IsString({ message: 'Título precisa ser uma string.' })
  title: string;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia.' })
  @IsString({ message: 'Descrição precisa ser uma string.' })
  description: string;

  @IsNotEmpty({ message: 'Usuário não pode ser vaizo.' })
  @IsUUID('4', { message: 'Usuário vinculado incorretamente.' })
  user: User;
}
