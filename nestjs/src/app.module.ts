import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from "../../src/auth/auth.module";
//import {User} from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: 'localhost',
      port: 3306,
      username: 'QweAsdZxc!23',
      password: 'QweAsdZxc!23',
      database: 'curses',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true //В продакшене использовать не надо, можно потерять производственные данные
    }),
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
