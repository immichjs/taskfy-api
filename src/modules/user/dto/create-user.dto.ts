import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Primeiro nome não pode ser vazio.' })
  @IsString({ message: 'Primeiro nome precisa ser uma string.' })
  firstname: string;

  @IsNotEmpty({ message: 'Sobrenome não pode ser vazio.' })
  @IsString({ message: 'Sobrenome precisa ser uma string.' })
  lastname: string;

  @IsNotEmpty({ message: 'E-mail não pode ser vazio.' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsNotEmpty({ message: 'Nome de usuário não pode ser vazio.' })
  @IsString({ message: 'Nome de usuário precisa ser uma string.' })
  @MaxLength(36, {
    message: 'Nome de usuário pode ter no máximo 36 caracteres.',
  })
  username: string;

  @IsNotEmpty({ message: 'Nome de usuário não pode ser vazio.' })
  @IsString({ message: 'Senha precisa ser uma string.' })
  @MinLength(4, { message: 'Senha precisa ter no mínimo 4 caracteres.' })
  @MaxLength(16, { message: 'Senha precisa ter no máximo 16 caracteres.' })
  password: string;
}
