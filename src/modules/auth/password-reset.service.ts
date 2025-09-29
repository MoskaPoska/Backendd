import {Injectable, UnauthorizedException, BadRequestException, NotFoundException} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class PasswordResetService {

    private passwordResetTokens = {};

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) {}


    async requestPasswordReset(email: string): Promise<void> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return;
        }

        const payload = { email: user.email };

        const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });

        this.passwordResetTokens[user.email] = resetToken;

        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}&email=${user.email}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Зброс пароля',
            template: './password-reset',
            context: {
                name: user.name,
                resetUrl,
            },
        });
    }

    async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
        if (this.passwordResetTokens[email] !== token) {
            throw new UnauthorizedException('Неправильний або прострочений токен');
        }

        try {
            this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException('Неправильний або прострочений токен');
        }

        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException('Користувач не знайдений');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userService.updatePassword(user.id, hashedPassword);

        delete this.passwordResetTokens[email];
    }
}
