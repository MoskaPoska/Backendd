import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity'; // Импортируем сущность Course
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from '../auth/auth.module'; // Импортируем AuthModule, если нужны защищенные маршруты

@Module({
    imports: [
        TypeOrmModule.forFeature([Course]), // Регистрируем репозиторий для сущности Course
        AuthModule, // Если CoursesController будет использовать AuthGuard или RolesGuard
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService], // Экспортируем CoursesService, если он понадобится другим модулям
})
export class CoursesModule {}