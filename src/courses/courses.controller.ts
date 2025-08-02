import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../roles/roles.decorator'; // Импортируем декоратор @Roles
import { Role } from '../enums/role.enum';       // Импортируем перечисление Role
import { Public } from '../auth/constants';      // Импортируем декоратор @Public (если нужен)

@Controller('courses') // Базовый путь для всех маршрутов в этом контроллере
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED) // Возвращаем 201 Created при успешном создании
    @Roles(Role.Admin) // Только администраторы могут создавать курсы
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @Public() // Предположим, что список курсов доступен всем
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    @Public() // Предположим, что просмотр одного курса доступен всем
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id); // Преобразуем ID из строки в число
    }

    @Patch(':id')
    @Roles(Role.Admin) // Только администраторы могут обновлять курсы
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Возвращаем 204 No Content при успешном удалении
    @Roles(Role.Admin) // Только администраторы могут удалять курсы
    remove(@Param('id') id: string) {
        return this.coursesService.remove(+id);
    }
}