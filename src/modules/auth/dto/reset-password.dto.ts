import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Пароль повинен містити щонайменше 8 символів.' })

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Пароль повинен містити як мінімум одну заголовну літеру, одну малу, одну цифру та один спеціальний символ.'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    password_confirmation: string;
    email: string;
    newPassword: string;
}