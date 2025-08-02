import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, IsIn, Min, Max } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1) // Предполагаем, что ID языка начинается с 1
    language_id: number;

    @IsString()
    @IsOptional()
    @IsIn(['beginner', 'intermediate', 'advanced']) // Ограничиваем возможные значения
    difficulty_level?: string = 'beginner'; // Значение по умолчанию

    @IsString()
    @IsOptional()
    @IsUrl() // Проверяем, что это валидный URL
    image_url?: string;
}
