import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty({ message: 'Nome de usuário não pode ser vazio.' })
  @IsString({ message: 'Senha precisa ser uma string.' })
  password: string;
}
