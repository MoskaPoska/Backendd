import { Controller, Post, Get, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AchievementService} from "./achievmant.service";
import { Achievement} from "../../entities/achievmant.entity";
import { CreateAchievmantDto, UpdateAchievmantDto } from './dto/achievmant.dto';

@Controller('achievements')
export class AchievementController {
    constructor(private readonly achievementService: AchievementService) {}


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createAchievmantDto: CreateAchievmantDto): Promise<Achievement> {
        return this.achievementService.create(createAchievmantDto);
    }

    @Get()
    findAll(): Promise<Achievement[]> {
        return this.achievementService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Achievement> {
        return this.achievementService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateAchievmantDto: UpdateAchievmantDto): Promise<Achievement> {
        return this.achievementService.update(id, updateAchievmantDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number): Promise<void> {
        return this.achievementService.remove(id);
    }
}
