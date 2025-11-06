import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Унікальний токен, отриманий з електронного листа для скидання пароля.',
    })
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({
        description: 'Новий пароль користувача. Повинен містити мінімум 8 символів, включаючи одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ.',
        minimum: 8,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Пароль повинен містити щонайменше 8 символів.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Пароль повинен містити як мінімум одну заголовну літеру, одну малу, одну цифру та один спеціальний символ.'
    })
    password: string;

    @ApiProperty({
        description: 'Повторне введення нового пароля для підтвердження. Має збігатися з полем "password".',
    })
    @IsString()
    @IsNotEmpty()
    password_confirmation: string;

    @ApiProperty({
        description: 'Електронна пошта користувача (може бути потрібна для внутрішньої логіки).',
        required: false
    })
    email: string;

    @ApiProperty({
        description: 'Новий пароль користувача',
        required: false
    })
    newPassword: string;
}