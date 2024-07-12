import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotStepsModule } from '../bot-steps/bot-steps.module';
import { BotsModule } from '../bots/bots.module';
import { CustomersModule } from '../customers/customers.module';
import { MessageLogsModule } from '../message-logs/message-logs.module';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Sessions } from './entities/conversation.entity';
import { WhatsappService } from './services/whatsapp.services';

@Module({
  imports: [
    CustomersModule,
    BotsModule,
    BotStepsModule,
    MessageLogsModule,
    TypeOrmModule.forFeature([Sessions]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, WhatsappService],
})
export class ConversationsModule {}
