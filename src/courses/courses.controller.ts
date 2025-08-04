import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/role.enum';
import { Public } from '../auth/constants';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @Public()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    @Public()
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    remove(@Param('id') id: string) {
        return this.coursesService.remove(+id);
    }
}