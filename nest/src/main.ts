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

import * as nodemailer from 'nodemailer';

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
    origin(reqOrigin, callback) {
      callback(null, reqOrigin);
    },
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

const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: 'yanglee2421@qq.com',
    pass: 'gwoveuljvnbidjgj',
  },
});

transporter.sendMail(
  {
    from: 'yanglee2421@qq.com',
    to: 'yanglee2421@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  },
  (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  },
);
