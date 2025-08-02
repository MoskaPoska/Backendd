import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

// PartialType делает все поля CreateCourseDto необязательными
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
