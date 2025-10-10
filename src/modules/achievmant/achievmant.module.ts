import { Module } from '@nestjs/common';
import { AchievementService} from "./achievmant.service";
import { AchievementController} from "./achievmant.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Achievement} from "../../entities/achievmant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementController],
  providers: [AchievementService],

  exports: [AchievementService],
})
export class AchievementModule {}
