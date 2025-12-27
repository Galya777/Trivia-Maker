import { Module } from '@nestjs/common';
import { ActiveTestsGateway } from './active-tests.gateway';

@Module({
  providers: [ActiveTestsGateway],
})
export class ActiveTestsModule {}