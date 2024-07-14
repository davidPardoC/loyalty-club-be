import { Module } from '@nestjs/common';
import { HabilitiesController } from './abilities.controller';
import { HabilitiesService } from './abilities.service';

@Module({
  controllers: [HabilitiesController],
  providers: [HabilitiesService],
})
export class HabilitiesModule {}
