import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configSchema, configurations } from '~config';
import { roles } from '~m/auth/app.roles';

import { AuthModule } from '~m/auth/auth.module';
import { SongModule } from '~m/song/song.module';
import { UserModule } from '~m/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: configSchema,
      load: [configurations],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('database'),
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UserModule,
    SongModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
