import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '~decorators';

import { CreateUserDto, UpdateUserDto } from '~/modules/user/dto';
import { Resource, Rol } from '~m/auth/app.roles';

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
  @ApiQuery({ name: 'roles', enum: Rol })
  async create(
    @Body() dto: CreateUserDto,
    @Query('roles') roles: Rol = Rol.USER,
  ) {
    const data = await this.userService.create(dto, roles);
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
  ) {
    return this.userService.update(id, dto);
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
