import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStat} from "../../entities/user-stat.entities";
import { UpdateStatDto } from './dto/update-stat.dto';

@Injectable()
export class UserStatService {
    private readonly logger = new Logger(UserStatService.name);

    constructor(
        @InjectRepository(UserStat)
        private statRepository: Repository<UserStat>,
    ) {}

    async createInitialStat(userId: number): Promise<UserStat> {
        const newStat = this.statRepository.create({ userId });
        return this.statRepository.save(newStat);
    }

    async findOneByUserId(userId: number): Promise<UserStat> {
        const stat = await this.statRepository.findOne({ where: { userId } });
        if (!stat) {
            throw new NotFoundException(`Статистика для користувача ${userId} не знайдена.`);
        }
        return stat;
    }

    async updateStat(userId: number, updateDto: UpdateStatDto): Promise<UserStat> {
        const stat = await this.findOneByUserId(userId);

        const XP_PER_TASK = 25;
        const { category } = updateDto;

        const XP_PER_LEVEL = 100;
        const oldLevel = stat.level;

        stat[category] = stat[category] + XP_PER_TASK;
        stat.total_xp += XP_PER_TASK;

        const newLevel = Math.floor(stat.total_xp / XP_PER_LEVEL) + 1;

        if (newLevel > oldLevel) {
            stat.level = newLevel;

            this.logger.log(`Користувач ${userId} підвищив рівень: ${oldLevel} -> ${newLevel}`);
        }

        return this.statRepository.save(stat);
    }
}