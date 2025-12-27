import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { PrismaService } from '../prisma/prisma.services';
import { ActiveTestsModule } from '../active-tests/active-tests.module';

@Module({
  imports: [ActiveTestsModule],
  controllers: [TestsController],
  providers: [TestsService, PrismaService],
})
export class TestsModule {}