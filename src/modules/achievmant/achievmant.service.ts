import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Achievement} from "../../entities/achievmant.entity";

@Injectable()
export class AchievementService {
    constructor(
        @InjectRepository(Achievement)
        private achievementsRepository: Repository<Achievement>,
    ) {}

    async create(achievement: Partial<Achievement>): Promise<Achievement> {
        const newAchievement = this.achievementsRepository.create(achievement);
        return this.achievementsRepository.save(newAchievement);
    }

    async findAll(): Promise<Achievement[]> {
        return this.achievementsRepository.find();
    }

    async findOne(id: number): Promise<Achievement> {
        const achievement = await this.achievementsRepository.findOne({ where: { id } });
        if (!achievement) {
            throw new NotFoundException(`Досягнень з ID "${id}" не знайдено`);
        }
        return achievement;
    }

    async update(id: number, achievement: Partial<Achievement>): Promise<Achievement> {
        await this.achievementsRepository.update(id, achievement);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.achievementsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Досягнень з ID "${id}" не знайдено`);
        }
    }
}