import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { PasswordResetService} from "../password-reset/password-reset.service";
import { PasswordResetController} from "../password-reset/passwordReset.controller";
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '../mailer/mailer.config';

@Module({
  imports: [
    UserModule,

    MailerModule.forRoot(mailerConfig),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    PasswordResetService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController, PasswordResetController],
  exports: [AuthService, PasswordResetService],
})
export class AuthModule {}
