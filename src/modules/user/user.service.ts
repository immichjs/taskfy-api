import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { compareEncryptedValue, encryptData } from 'src/utilities/functions';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['directories'] });
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['directories'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async createUser({
    firstname,
    lastname,
    email,
    username,
    password,
  }: CreateUserDto): Promise<User> {
    const hasUserByUsername = await this.userRepository.count({
      where: { username },
    });

    const hastUserByEmail = await this.userRepository.count({
      where: { email },
    });

    if (hasUserByUsername) {
      throw new BadRequestException(
        'Já existe um usuário com esse nome de usuário.',
      );
    }

    if (hastUserByEmail) {
      throw new BadRequestException('Já existe um usuário com esse e-mail.');
    }

    const hash = await encryptData(password);

    const user = await this.userRepository.create({
      firstname,
      lastname,
      email,
      username,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  async updateUser(
    id: string,
    { firstname, lastname, password, newPassword }: UpdateUserDto,
  ): Promise<User> {
    const hasUser = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'password'],
    });

    if (!hasUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!password) {
      throw new BadRequestException('Senha obrigatória para editar o usuário.');
    }

    if (!(await compareEncryptedValue(hasUser.password, password))) {
      throw new BadRequestException('Senha incorreta.');
    }

    await this.userRepository.update(id, {
      firstname,
      lastname,
      password: newPassword,
    });

    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async deleteUser(id: string, { password }: DeleteUserDto): Promise<void> {
    const hasUser = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'password'],
    });

    if (!hasUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!password) {
      throw new BadRequestException(
        'Senha obrigatória para deletar o usuário.',
      );
    }

    if (!(await compareEncryptedValue(hasUser.password, password))) {
      throw new BadRequestException('Senha incorreta.');
    }

    await this.userRepository.delete({ id });
  }
}
