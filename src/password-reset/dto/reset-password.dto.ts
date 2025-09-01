import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Пароль должен содержать не менее 8 символов.' })
    // Пример регулярного выражения для проверки пароля
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Пароль должен содержать как минимум одну заглавную букву, одну строчную, одну цифру и один специальный символ.'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
        // Matches-валидация для подтверждения пароля, убедитесь, что она соответствует логике вашего контроллера
    password_confirmation: string;
}