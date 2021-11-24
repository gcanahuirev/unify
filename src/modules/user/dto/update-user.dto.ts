import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Rol } from '~/modules/auth/app.roles';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ enum: Rol })
  readonly roles: Rol;
}
