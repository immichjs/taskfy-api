import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDirectoryDto {
  @IsNotEmpty({ message: 'Título não pode ser vazio.' })
  @IsString({ message: 'Título precisa ser uma string.' })
  title: string;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia.' })
  @IsString({ message: 'Descrição precisa ser uma string.' })
  description: string;
}
