import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestResetPasswordDto {
    @IsEmail({}, { message: 'Пожалуйста, введите корректный адрес электронной почты.' })
    @IsNotEmpty({ message: 'Поле электронной почты не может быть пустым.' })
    email: string;
}