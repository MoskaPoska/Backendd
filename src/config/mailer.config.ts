import { join } from 'path';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';

dotenv.config();

export const mailerConfig: MailerOptions = {
    transport: {
        host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
        port: +process.env.MAIL_PORT! || 2525,
        ignoreTLS: true,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    },
    defaults: {
        from: '"No Reply" <noreply@yourdomain.com>',
    },
    template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};
