import Joi from 'joi';
import { join } from 'path';

import type { JwtModuleOptions } from '@nestjs/jwt';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string(),
  DEFAULT_USER_EMAIL: Joi.string().email(),
  DEFAULT_USER_PASSWORD: Joi.string().min(8).max(128),
});

export const configurations = () => ({
  api: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../../**/*entity{.ts,.js}')],
    autoLoadEntities: true,

    // Migrations
    migrationsRun: true,
    migrationsTableName: 'migration_table',
    migrations: [join(__dirname, '../../migrations/**/*{.ts,.js}')],
    cli: {
      migrationsDir: 'src/migrations',
    },

    // TypeORM
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    logger: 'file',
  } as TypeOrmModuleOptions,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  } as JwtModuleOptions,
  defaultUser: {
    name: 'admin',
    email: process.env.DEFAULT_USER_EMAIL || 'admin@mail.com',
    password: process.env.DEFAULT_USER_PASSWORD || 'password#321',
    roles: ['admin'],
  },
  contract: {
    nftAddress:
      process.env.NFT_ADDRESS || '0x0000000000000000000000000000000000000000',
    marketAddress:
      process.env.MARKET_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
  },
  ipfs: {
    url: process.env.IPFS_URL || 'http://localhost:5001',
  },
});
