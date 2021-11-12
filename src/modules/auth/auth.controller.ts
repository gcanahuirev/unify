import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, LocalAuthGuard } from '~m/auth/guards';
import { AuthService } from '~m/auth/auth.service';
import { LoginDto } from '~/modules/auth/dto';
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('register')
  register() {
    return { message: 'Registration Successful' };
  }
}
