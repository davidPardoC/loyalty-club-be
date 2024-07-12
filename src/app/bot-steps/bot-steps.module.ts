import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotStepsController } from './bot-steps.controller';
import { BotStepsService } from './bot-steps.service';
import { BotStep } from './entities/bot-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BotStep])],
  controllers: [BotStepsController],
  providers: [BotStepsService],
  exports: [BotStepsService],
})
export class BotStepsModule {}
