import { Module } from '@nestjs/common';
import { HabilitiesService } from './habilities.service';
import { HabilitiesController } from './habilities.controller';

@Module({
  controllers: [HabilitiesController],
  providers: [HabilitiesService],
})
export class HabilitiesModule {}
