import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from '../auth/auth.module';
import {AzureModule} from "../../azure/azure.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Course]),
        AuthModule,
        AzureModule,
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}