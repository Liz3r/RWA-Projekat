import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: ['http://localhost:4200','http://localhost:3000', '127.0.0.1:4200', '127.0.0.1:3000'],
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
