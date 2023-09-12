// NestJs Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

// NodeJs Imports
import { resolve } from 'node:path';
// import { readFileSync } from 'node:fs';

// Express Imports
// import { Response, Request } from 'express';

bootstrap();

async function bootstrap() {
  // Create App
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    /*  httpsOptions: {
       key: readFileSync(toPath('../https/localhost+1-key.pem')),
      cert: readFileSync(toPath('../https/localhost+1.pem')),
    }, */
  });

  // ** Cors
  app.enableCors({
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://192.168.1.4:3000',
    ],
  });

  // Body Validate
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Static Assets
  app.useStaticAssets(toPath('../public'), {
    prefix: '/public',
  });

  await app.listen(3003);
}

function toPath(path: string) {
  return resolve(__dirname, path);
}
