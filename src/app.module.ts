import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from "./auth/auth.module";
import { User } from "./entities/user.entity";
import { Language } from './entities/language.entity';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Progress } from './entities/progress.entity';
//import { Achievement } from "./entities/achievement.entity";

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { CoursesModule } from './courses/courses.module';
import { AchievmantModule } from './achievmant/achievmant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      // При локальном запуске используйте localhost
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER || 'QweAsdZxc23',
      password: process.env.DATABASE_PASSWORD || 'YES',
      database: process.env.DATABASE_NAME || 'curses',
      entities: [
        User,
        Language,
        Course,
        Lesson,
        Progress,
        //Achievement,
      ],
      synchronize: true
    }),
    AuthModule,
    CoursesModule,
    AchievmantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
