import { Controller, Post, Body, Get, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('me')
    async me(@Request() req) {
        return req.user;
    }
}