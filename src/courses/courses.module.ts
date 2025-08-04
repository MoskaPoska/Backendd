import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course]),
        AuthModule,
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}