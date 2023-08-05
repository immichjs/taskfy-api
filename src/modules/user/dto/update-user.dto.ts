import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Primeiro nome não pode ser vazio.' })
  @IsString({ message: 'Primeiro nome precisa ser uma string.' })
  firstname: string;

  @IsNotEmpty({ message: 'Sobrenome não pode ser vazio.' })
  @IsString({ message: 'Sobrenome precisa ser uma string.' })
  lastname: string;

  @IsNotEmpty({ message: 'Nome de usuário não pode ser vazio.' })
  @IsString({ message: 'Senha precisa ser uma string.' })
  password: string;

  @IsNotEmpty({ message: 'Nova senha não pode ser vazio.' })
  @IsString({ message: 'Nova senha precisa ser uma string.' })
  @MinLength(4, { message: 'Nova senha precisa ter no mínimo 4 caracteres.' })
  @MaxLength(16, { message: 'Nova senha precisa ter no máximo 16 caracteres.' })
  newPassword: string;
}
