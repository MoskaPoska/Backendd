import {IsString, IsNotEmpty, MinLength, MaxLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Email користувача для входу',

    })
    @IsString({ message: 'Email повинен бути текстовим рядком.' })
    @IsNotEmpty({ message: 'Email не може бути порожнім.' })
    @IsEmail({}, { message: 'Введіть коректний формат електронної пошти.' })
    email: string;

    @ApiProperty({
        description: 'Пароль користувача',

    })
    @IsString({ message: 'Пароль повинен бути текстовим рядком.' })
    @IsNotEmpty({ message: 'Пароль не може бути порожнім.' })
    @MinLength(6, { message: 'Пароль повинен містити не менше 6 символів.' })
    password: string;
}