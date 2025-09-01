// src/password-reset/password-reset.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { Public } from '../auth/constants';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import {ResetPasswordDto} from "./dto/reset-password.dto";

@Controller('auth/password')
export class PasswordResetController {
    constructor(private readonly passwordResetService: PasswordResetService) {}

    @Public()
    @Post('email')
    async requestReset(@Body() requestDto: RequestResetPasswordDto) {
        // This is the first step: send a reset token to the user's email
        await this.passwordResetService.sendResetEmail(requestDto.email);
        return { message: 'Password reset link sent successfully.' };
    }
    @Public()
    @Post('update')
    async resetPassword(@Body() resetDto: ResetPasswordDto) {
        // This is the second step: reset the user's password
        await this.passwordResetService.resetPassword(resetDto.token, resetDto.password);
        return { message: 'Password has been successfully updated.' };
    }
}