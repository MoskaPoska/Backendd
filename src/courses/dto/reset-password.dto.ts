import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RequestResetDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}
