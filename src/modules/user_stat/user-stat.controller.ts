import { Controller, Get, Param, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserStatService } from './user-stat.service';
import { UpdateStatDto } from './dto/update-stat.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { UserStat} from "../../entities/user-stat.entities";

@ApiTags('user-stats')
@ApiBearerAuth()
@Controller('user-stats')
export class UserStatController {
    constructor(private readonly userStatService: UserStatService) {}


    @Get(':userId')
    async getUserStat(@Param('userId') userId: string): Promise<UserStat> {
        return this.userStatService.findOneByUserId(parseInt(userId, 10));
    }

    @Patch('update')
    async updateStat(@Request() req, @Body() updateDto: UpdateStatDto): Promise<UserStat> {
        const userId = req.user.sub;
        return this.userStatService.updateStat(userId, updateDto);
    }
}