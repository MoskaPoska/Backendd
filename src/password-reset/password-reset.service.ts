import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PasswordReset } from '../entities/password-reset.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(PasswordReset)
        private passwordResetRepository: Repository<PasswordReset>,
        private readonly mailerService: MailerService,
    ) {}

    async sendResetEmail(email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User with this email not found.');
        }

        const token = uuidv4();
        const expires_at = dayjs().add(1, 'hour').toDate();

        const passwordReset = this.passwordResetRepository.create({
            token,
            expires_at,
            user,
        });
        await this.passwordResetRepository.save(passwordReset);

        const resetLink = `http://your-frontend-domain/reset-password?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: 'noreply@yourdomain.com',
            subject: 'Password Reset Request',
            html: `Click on the link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
        });
    }

    async resetPassword(token: string, newPassword): Promise<void> {
        const resetRecord = await this.passwordResetRepository.findOne({
            where: { token },
            relations: ['user'],
        });

        if (!resetRecord || dayjs(resetRecord.expires_at).isBefore(dayjs())) {
            throw new BadRequestException('Invalid or expired password reset token.');
        }

        const user = resetRecord.user;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password_hash = hashedPassword;
        await this.usersRepository.save(user);

        await this.passwordResetRepository.remove(resetRecord);
    }
}