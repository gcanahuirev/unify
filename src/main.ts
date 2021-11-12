import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import FastifyFormidable from 'fastify-formidable';
import { fastifyHelmet } from 'fastify-helmet';
import { initSwagger } from '~/app.swagger';

import { generateDefaultUser, generateTypeormConfigFile } from '~/scripts';

import { AppModule } from '~/app.module';

const fastifyOpts = {
  logger: {
    prettyPrint: {
      levelFirst: true,
      translateTime: 'SYS:dd-mm-yyyy h:MM:ss TT Z',
      ignore: 'hostname',
      colorize: true,
    },
    level: 'debug',
  },
};

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyOpts),
    {
      logger: ['error', 'warn', 'debug', 'verbose', 'log'],
    },
  );

  /* ======= LOAD CONFIG .ENV.* ======= */
  const config: ConfigService<Record<string, unknown>> = app.get(ConfigService);

  /* ======= SET PREFIX END_POINT ======= */
  app.setGlobalPrefix('api/v1');

  /* ======= GENERATE TYPEORM CONFIG FILE ======= */
  generateTypeormConfigFile(config);

  /* ======= GENERATE TYPEORM CONFIG FILE ======= */
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  });

  /* ======= GENERATE TYPEORM CONFIG FILE ======= */
  await app.register(FastifyFormidable, {
    formidable: {
      // max 500 mb
      maxFileSize: 500 * 1024 * 1024,
    },
  });

  /* ======= ENABLE CORS ======= */
  app.enableCors();

  /* ======= GENERATE DEAFULT USER ======= */
  await generateDefaultUser(config);

  /* ======= VALIDATE PIPE (USE DTOs) ======= */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /* ======= INIT DOC SWAGGER ======= */
  initSwagger(app);

  /* ======= SET PORT ======= */
  await app.listen(config.get<number>('api.port'), '0.0.0.0');

  /* ======= DOCS GENERATE ======= */
  logger.debug(
    `Swagger document generated ${await app.getUrl()}/api/v1/docs`,
    'Swagger',
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
