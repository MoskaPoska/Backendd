import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestResetPasswordDto {
    @IsEmail({}, { message: 'Будь ласка, введіть правильну адресу електронної пошти.' })
    @IsNotEmpty({ message: 'Поле електронної пошти не може бути порожнім.' })
    email: string;
}