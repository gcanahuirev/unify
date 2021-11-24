import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';

import { AuthService } from '~m/auth/auth.service';
import { LocalAuthGuard } from '~m/auth/guards';

import { LoginDto, RegisterDto } from '~/modules/auth/dto';
import { Rol } from '~m/auth/app.roles';
import { User } from '~decorators';
import { User as UserEntity } from '~m/user/entities';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return { message: 'Login Successful', data };
  }

  @Post('register')
  @ApiQuery({ name: 'roles', enum: Rol })
  async register(
    @Body() dto: RegisterDto,
    @Query('roles') roles: Rol = Rol.USER,
  ) {
    const data = await this.authService.register(dto, roles);
    return {
      message: 'Registration Successful',
      data,
    };
  }
}
