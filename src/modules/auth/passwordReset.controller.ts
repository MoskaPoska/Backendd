import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { Public } from "./constants";
import { RequestResetDto} from "./dto/request-reset.dto";
import {ResetPasswordDto} from "./dto/reset-password.dto";

@Controller('auth/password')
export class PasswordResetController {
    constructor(private readonly passwordResetService: PasswordResetService) {}

    @Public()
    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    async requestPasswordReset(@Body() requestResetDto: RequestResetDto): Promise<{ message: string }> {
        await this.passwordResetService.requestPasswordReset(requestResetDto.email);
        return { message: 'Якщо такий користувач існує, посилання для скидання пароля надіслано на вашу пошту.' };
    }

    @Public()
    @Post('reset')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        await this.passwordResetService.resetPassword(
            resetPasswordDto.email,
            resetPasswordDto.token,
            resetPasswordDto.newPassword,
        );
        return { message: 'Пароль успішно змінено.' };
    }
}
