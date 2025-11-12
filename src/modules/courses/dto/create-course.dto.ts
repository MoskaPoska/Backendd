import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, IsIn, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {AzureBlobService } from "../../../azure/azure.service";
import { Type } from 'class-transformer';
export class CreateCourseDto {
    @ApiProperty({ description: 'Назва курсу', example: 'Beginner English' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Опис курсу', example: 'Основи англійської мови' })
    @IsString()
    @IsOptional()
    description?: string;

    @Type(() => Number)
    @ApiProperty({ description: 'Ідентифікатор мов курса', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    language_id: number;

    @ApiPropertyOptional({
        description: 'Рівень складності курсу',
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    })
    @IsString()
    @IsOptional()
    @IsIn(['beginner', 'intermediate', 'advanced'])
    difficulty_level?: string = 'beginner';

    @ApiPropertyOptional({ description: 'URL зображення курса', example: 'https://example.com/image.jpg' })
    @IsString()
    @IsOptional()
    @IsUrl()
    image_url?: string;

    @Type(() => Number)
    @ApiProperty({ description: 'Ціна курсу', example: 100 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;
}