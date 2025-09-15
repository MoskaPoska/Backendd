import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RequestResetDto {
    @IsEmail({}, { message: 'Неправильний формат електронної пошти.' })
    @IsNotEmpty({ message: 'Поле email не повинно бути порожнім.' })
    email: string;
}

export class ResetPasswordDto {
    @IsEmail({}, { message: 'Неправильний формат електронної пошти.' })
    @IsNotEmpty({ message: 'Поле email не повинно бути порожнім.' })
    email: string;

    @IsString({ message: 'Токен має бути рядком.' })
    @IsNotEmpty({ message: 'Поле токена не повинно бути порожнім.' })
    token: string;

    @IsString({ message: 'Пароль має бути рядком.' })
    @IsNotEmpty({ message: 'Поле пароля не повинно бути порожнім.' })
    @MinLength(6, { message: 'Пароль повинен містити щонайменше 6 символів.' })
    newPassword: string;
}
