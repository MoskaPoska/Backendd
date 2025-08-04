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
    @Min(1)
    language_id: number;

    @IsString()
    @IsOptional()
    @IsIn(['beginner', 'intermediate', 'advanced'])
    difficulty_level?: string = 'beginner';

    @IsString()
    @IsOptional()
    @IsUrl()
    image_url?: string;
}
