import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { ApiTags } from '@nestjs/swagger';

import { Auth, User } from '~decorators';
import { CreateUserDto, UpdateUserDto } from '~/modules/user/dto';
import { Resource } from '~m/auth/app.roles';
import { User as UserEntity } from '~m/user/entities';
import { UserService } from '~m/user/user.service';

@ApiTags('Users routes')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Auth()
  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return {
      message: 'FIND_ALL_MESSAGE',
      data,
    };
  }

  @Auth()
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOneById(id);
    return {
      message: data ? 'User found' : 'User not found',
      data,
    };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: Resource.USER,
  })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return {
      message: 'User has been successfully created',
      data,
    };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: Resource.USER,
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @User() user: UserEntity,
  ) {
    let data: UserEntity;
    if (this.rolesBuilder.can(user.roles).updateAny(Resource.USER).granted) {
      // Is Admin
      data = await this.userService.update(id, dto);
    } else {
      // Is not Admin
      // eslint-disable-next-line no-lonely-if
      if (user.id === id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { roles, ...rest } = dto;
        data = await this.userService.update(id, rest);
      } else {
        throw new UnauthorizedException(
          'You are not allowed to update this user',
        );
      }
    }

    return {
      message: `User with ID ${id} has been successfully updated`,
      data,
    };
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.remove(id);
    return {
      message: `User with ID ${id} has been successfully removed`,
      data,
    };
  }
}
