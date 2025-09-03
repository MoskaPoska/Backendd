// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  //app.useGlobalPipes(new ValidationPipe());

  const port = 3001;
  await app.listen(port);

  console.log(`\nApplication is running on: http://localhost:${port}`);
}
bootstrap();