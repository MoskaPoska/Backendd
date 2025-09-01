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
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/role.enum';
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
    @ApiOperation({ summary: 'Создание нового курса' })
    @ApiResponse({ status: 201, description: 'Курс успешно создан', type: CreateCourseDto })
    @ApiResponse({ status: 400, description: 'Неверные данные' })
    @ApiResponse({ status: 403, description: 'Доступ только для администраторов' })
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Получение списка всех курсов' })
    @ApiResponse({ status: 200, description: 'Список курсов', type: [CreateCourseDto] })
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Получение курса по ID' })
    @ApiResponse({ status: 200, description: 'Курс найден', type: CreateCourseDto })
    @ApiResponse({ status: 404, description: 'Курс не найден' })
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Обновление курса по ID' })
    @ApiResponse({ status: 200, description: 'Курс успешно обновлен', type: UpdateCourseDto })
    @ApiResponse({ status: 400, description: 'Неверные данные' })
    @ApiResponse({ status: 403, description: 'Доступ только для администраторов' })
    @ApiResponse({ status: 404, description: 'Курс не найден' })
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Удаление курса по ID' })
    @ApiResponse({ status: 204, description: 'Курс успешно удален' })
    @ApiResponse({ status: 403, description: 'Доступ только для администраторов' })
    @ApiResponse({ status: 404, description: 'Курс не найден' })
    remove(@Param('id') id: string) {
        return this.coursesService.remove(+id);
    }
}