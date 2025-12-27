import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';
import { PrismaService } from '../prisma/prisma.services';

@Module({
  controllers: [CompetitionsController],
  providers: [CompetitionsService, PrismaService],
})
export class CompetitionsModule {
  // Module for managing competitions
}