import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, IsIn, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
    @ApiProperty({ description: 'Название курса', example: 'Beginner English' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Описание курса', example: 'Основы английского языка' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Идентификатор языка курса', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    language_id: number;

    @ApiPropertyOptional({
        description: 'Уровень сложности курса',
        example: 'beginner',
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    })
    @IsString()
    @IsOptional()
    @IsIn(['beginner', 'intermediate', 'advanced'])
    difficulty_level?: string = 'beginner';

    @ApiPropertyOptional({ description: 'URL изображения курса', example: 'https://example.com/image.jpg' })
    @IsString()
    @IsOptional()
    @IsUrl()
    image_url?: string;

    @ApiProperty({ description: 'Цена курса', example: 100 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;
}