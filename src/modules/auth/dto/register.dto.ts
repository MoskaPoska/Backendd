import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Унікальний email користувача',
    })
    @IsString({ message: 'Email має бути рядком.' })
    @IsNotEmpty({ message: 'Email не може бути порожньою.' })
    @IsEmail({}, { message: 'Невірний формат електронної пошти.' })
    email: string;

    @ApiProperty({
        description: "Ім'я користувача",
    })
    @IsString({ message: "Ім'я має бути рядком." })
    @IsNotEmpty({ message: "Ім'я не може бути порожнім." })
    name: string;

    @ApiProperty({
        description: 'Пароль користувача',
        minLength: 8,
    })
    @IsString({ message: 'Пароль має бути рядком.' })
    @IsNotEmpty({ message: 'Пароль не може бути порожнім.' })
    @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів.' })
    password: string;
}