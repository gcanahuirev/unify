import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Unify API dapp')
    .addBearerAuth()
    .setDescription('Backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/v1/docs', app, document, {
    uiConfig: {
      deepLinking: true,
      displayOperationId: true,
      defaultModelRendering: 'model',
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      // layout: 'BaseLayout',
      showExtensions: true,
      showCommonExtensions: true,
      syntaxHighlight: {
        activate: true,
        theme: 'arta',
      },
      tryItOutEnabled: false,
    },
    staticCSP: true,
  });
};
