import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotStepsModule } from '../bot-steps/bot-steps.module';
import { BotStep } from '../bot-steps/entities/bot-step.entity';
import { Sessions } from '../conversations/entities/conversation.entity';
import { MessageLogsModule } from '../message-logs/message-logs.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';
import { Bot } from './entities/bot.entity';
import { BotExecutionService } from './services/bot-execution.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bot, Sessions, BotStep]),
    BotStepsModule,
    MessageLogsModule,
  ],
  controllers: [BotsController],
  providers: [BotsService, BotExecutionService],
  exports: [BotsService, BotExecutionService],
})
export class BotsModule {}
