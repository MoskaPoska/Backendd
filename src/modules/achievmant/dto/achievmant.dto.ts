import { IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateAchievmantDto {
    @ApiProperty({
        description: 'Унікальна назва досягнення',

    })
    @IsString({ message: 'Назва має бути текстовим рядком.' })
    @IsNotEmpty({ message: 'Назва досягнення не може бути порожньою.' })
    @MaxLength(255, { message: 'Назва не може перевищувати 255 символів.' })
    title: string;

    @ApiPropertyOptional({
        description: 'Детальний опис досягнення',

    })
    @IsString({ message: 'Опис має бути текстовим рядком.' })
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'URL до іконки досягнення, що зберігається в Azure',

    })
    @IsUrl({}, { message: 'Icon URL має бути дійсним посиланням.' })
    @IsOptional()
    icon_url?: string;

    @ApiPropertyOptional({
        description: 'Умова, яку потрібно виконати для отримання досягнення',

    })
    @IsString({ message: 'Умова має бути текстовим рядком.' })
    @IsOptional()
    condition?: string;
}

export class UpdateAchievmantDto extends PartialType(CreateAchievmantDto) {}