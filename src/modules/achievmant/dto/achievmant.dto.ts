import { IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAchievmantDto {
    @ApiProperty({
        description: 'Унікальна назва досягнення',
        example: '3-day streak',
        maxLength: 255,
    })
    @IsString()
    @IsNotEmpty({ message: 'Назва досягнення не може бути порожньою.' })
    @MaxLength(255)
    title: string;

    @ApiProperty({
        description: 'Детальний опис досягнення',
        example: 'Завершіть 3 уроки поспіль без перерв.',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'URL до іконки (зображення) досягнення',
        example: 'https://cdn.example.com/icon/3-day-streak.png',
        required: false,
    })
    @IsUrl({}, { message: 'Icon URL має бути дійсним посиланням.' })
    @IsOptional()
    icon_url?: string;

    @ApiProperty({
        description: 'Умова, яку потрібно виконати для отримання (логічний рядок або опис)',
        example: 'streak >= 3',
        required: false,
    })
    @IsString()
    @IsOptional()
    condition?: string;
}
export class UpdateAchievmantDto extends PartialType(CreateAchievmantDto) {}
