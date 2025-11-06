import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestResetDto {
    @ApiProperty({
        description: 'Emalil користувача для надсилання посилання на скидання пароля.',

    })
    @IsEmail({}, { message: 'Неправильний формат email.' })
    @IsNotEmpty({ message: 'Поле email не повинно бути порожнім.' })
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Електронна пошта користувача, чий пароль скидається.',

    })
    @IsEmail({}, { message: 'Неправильний формат email' })
    @IsNotEmpty({ message: 'Поле email не повинно бути порожнім.' })
    email: string;

    @ApiProperty({
        description: 'Унікальний токен, отриманий з електронного листа для скидання пароля.',

    })
    @IsString({ message: 'Токен має бути рядком.' })
    @IsNotEmpty({ message: 'Поле токена не повинно бути порожнім.' })
    token: string;

    @ApiProperty({
        description: 'Новий пароль користувача',

        minimum: 6,
    })
    @IsString({ message: 'Пароль має бути рядком.' })
    @IsNotEmpty({ message: 'Поле пароля не повинно бути порожнім.' })
    @MinLength(6, { message: 'Пароль повинен містити щонайменше 6 символів.' })
    newPassword: string;
}