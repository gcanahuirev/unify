import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from '~/modules/auth/dto';
import { User } from '~m/user/entities';
import { UserService } from '~m/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await compare(password, user.password))) {
      delete user.password;
      return user;
    }

    return null;
  }

  login(user: User): any {
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto, role: string): Promise<User> {
    const newUser = await this.userService.create(dto, role);
    return newUser;
  }
}
