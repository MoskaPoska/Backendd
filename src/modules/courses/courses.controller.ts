import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { Public } from '../auth/constants';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Створення нового курсу' })
    @ApiResponse({ status: 201, description: 'Курс успішно створено', type: CreateCourseDto })
    @ApiResponse({ status: 400, description: 'Неправильні дані' })
    @ApiResponse({ status: 403, description: 'Доступ лише для адміністраторів' })
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Отримання списку всіх курсів' })
    @ApiResponse({ status: 200, description: 'Список курсів', type: [CreateCourseDto] })
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Отримання курсу з ID' })
    @ApiResponse({ status: 200, description: 'Курс знайден', type: CreateCourseDto })
    @ApiResponse({ status: 404, description: 'Курс не знайден' })
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Оновлення курсу з ID' })
    @ApiResponse({ status: 200, description: 'Курс успішно оновлено', type: UpdateCourseDto })
    @ApiResponse({ status: 400, description: 'Неправильні дані' })
    @ApiResponse({ status: 403, description: 'Доступ лише для адміністраторів' })
    @ApiResponse({ status: 404, description: 'Курс не знайдено' })
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Видалення курсу з ID' })
    @ApiResponse({ status: 204, description: 'Курс успішно вилучено' })
    @ApiResponse({ status: 403, description: 'Доступ лише для адміністраторів' })
    @ApiResponse({ status: 404, description: 'Курс не знайдено' })
    remove(@Param('id') id: string) {
        return this.coursesService.remove(+id);
    }
}