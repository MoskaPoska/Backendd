import { Controller, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// Припустимо, що у вас є DTOs та сервіс
// import { UserService } from './user.service';
// import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {


    @Get('me')

    findOneSelf(): string {
        return 'Отримати дані авторизованого користувача (me)';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `Отримати дані користувача з ID: ${id}`;
    }

    @Patch(':id')
    update(@Param('id') id: string ): string {
        return `Оновити дані користувача з ID: ${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return `Видалити користувача з ID: ${id}`;
    }
}