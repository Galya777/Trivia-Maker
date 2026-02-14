import { Module } from '@nestjs/common';
import { ActiveTestsGateway } from './active-tests.gateway';

@Module({
  providers: [ActiveTestsGateway],
  exports: [ActiveTestsGateway],
})
export class ActiveTestsModule {}