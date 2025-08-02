import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard"; // Это ваш JWT-аутентификационный Guard

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService, // <-- ДОБАВЬТЕ ЭТУ СТРОКУ! Теперь AuthService предоставляется в этом модуле.
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Этот AuthGuard будет применен глобально
    },
  ],
  controllers: [AuthController],
  exports: [AuthService], // Теперь AuthService может быть экспортирован
})
export class AuthModule {}