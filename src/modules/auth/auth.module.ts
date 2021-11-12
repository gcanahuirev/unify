import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import type { JwtModuleOptions } from '@nestjs/jwt';

import { JwtStrategy, LocalStrategy } from '~m/auth/strategies';
import { AuthController } from '~m/auth/auth.controller';
import { AuthService } from '~m/auth/auth.service';
import { UserModule } from '~m/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<JwtModuleOptions>('jwt'),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
