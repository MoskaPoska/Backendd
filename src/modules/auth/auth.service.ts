import { Role } from '../../common/enums/role.enum';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Невірний email або пароль..');
        }

        const isPasswordMatching = await bcrypt.compare(pass, user.password_hash);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Невірний email або пароль.');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const newUser = await this.userService.create(
            registerDto.email,
            registerDto.name,
            hashedPassword
        );

        const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}