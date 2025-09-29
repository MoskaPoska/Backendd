// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  const config = new DocumentBuilder()
      .setTitle('English Courses API')
      .setDescription('API для курсов по английскому языку')
      .setVersion('1.0')
      .addTag('auth')
      .addTag('courses')
      .addTag('user')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.useGlobalPipes(new ValidationPipe());

  const port = 3001;
  await app.listen(port);

  console.log(`\n http://localhost:${port}`);
}
bootstrap();