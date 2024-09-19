import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: ['http://localhost:4200','http://localhost:3000', '127.0.0.1:4200', '127.0.0.1:3000'],
    credentials: true
  });
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  await app.listen(3000);
}
bootstrap();
