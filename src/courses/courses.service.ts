import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course) // Внедряем репозиторий TypeORM для сущности Course
        private coursesRepository: Repository<Course>,
    ) {}

    /**
     * Создает новый курс.
     * @param createCourseDto Данные для создания курса.
     * @returns Созданный курс.
     */
    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const newCourse = this.coursesRepository.create(createCourseDto);
        return this.coursesRepository.save(newCourse);
    }

    /**
     * Возвращает все курсы.
     * @returns Массив курсов.
     */
    async findAll(): Promise<Course[]> {
        return this.coursesRepository.find();
    }

    /**
     * Возвращает курс по его ID.
     * @param id ID курса.
     * @returns Курс.
     * @throws NotFoundException Если курс не найден.
     */
    async findOne(id: number): Promise<Course> {
        const course = await this.coursesRepository.findOne({ where: { id } });
        if (!course) {
            throw new NotFoundException(`Курс с ID ${id} не найден.`);
        }
        return course;
    }

    /**
     * Обновляет существующий курс.
     * @param id ID курса.
     * @param updateCourseDto Данные для обновления курса.
     * @returns Обновленный курс.
     * @throws NotFoundException Если курс не найден.
     */
    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.findOne(id);

        Object.assign(course, updateCourseDto);
        return this.coursesRepository.save(course);
    }

    /**
     * Удаляет курс по его ID.
     * @param id ID курса.
     * @throws NotFoundException Если курс не найден.
     */
    async remove(id: number): Promise<void> {
        const result = await this.coursesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Курс с ID ${id} не найден.`);
        }
    }
}