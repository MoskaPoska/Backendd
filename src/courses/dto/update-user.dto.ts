import { IsString, IsOptional, IsEmail, MinLength, MaxLength, IsEnum, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//import { Language } from '../entities/language.entity';

enum UserDifficultyLevel {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
}

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'Новое имя пользователя', example: 'JohnDoe', minLength: 3, maxLength: 50 })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    username?: string;

    @ApiPropertyOptional({ description: 'Новый email пользователя', example: 'john.doe@example.com' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: 'Новый пароль', example: 'NewPass123', minLength: 6 })
    @IsString()
    @IsOptional()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'Пароль должен содержать буквы и цифры' })
    password?: string;

    @ApiPropertyOptional({
        description: 'Предпочитаемый уровень сложности',
        example: 'intermediate',
        enum: UserDifficultyLevel,
    })
    @IsEnum(UserDifficultyLevel)
    @IsOptional()
    preferred_difficulty_level?: UserDifficultyLevel;

    @ApiPropertyOptional({ description: 'Предпочитаемый язык обучения', example: 'English' })
    @IsString()
    @IsOptional()
    preferred_language?: string;
}