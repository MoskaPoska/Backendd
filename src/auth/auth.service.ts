// src/auth/auth.service.ts (пример изменения)
// ...
import { Role } from '../enums/role.enum';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt"; // Импортируем Role

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, username: user.username, roles: user.roles };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}