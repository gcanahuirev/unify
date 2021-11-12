import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '~m/user/dto';
import { User } from '~m/user/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist)
      throw new BadRequestException('User already registered with email');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) throw new BadRequestException('User not found');

    const editedUser = Object.assign(user, dto);
    return this.userRepository.save(editedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) throw new BadRequestException('User not found');
    return this.userRepository.remove(user);
  }
}
