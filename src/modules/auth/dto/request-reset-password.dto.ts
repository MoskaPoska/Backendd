import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestResetPasswordDto {
    @ApiProperty({
        description: 'Email користувача, на яку буде надіслано посилання для скидання пароля.',

    })
    @IsEmail({}, { message: 'Будь ласка, введіть правильну адресу email.' })
    @IsNotEmpty({ message: 'Поле email не може бути порожнім.' })
    email: string;
}