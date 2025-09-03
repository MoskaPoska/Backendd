import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {LoginDto} from "../courses/dto/login.dto";
import {RegisterDto} from "../courses/dto/register.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiResponse({ status: 200, description: 'Успешная авторизация', type: String })
    @ApiResponse({ status: 401, description: 'Неверные credentials' })
    async signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получение профиля пользователя' })
    @ApiResponse({ status: 200, description: 'Профиль успешно получен', type: Object })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    getProfile(@Request() req) {
        return req.user;
    }
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}