import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from 'grammy';
import { BotExecutionService } from 'src/app/bots/services/bot-execution.service';
import { ProvidersEnum } from 'src/app/providers/constants/provider.enum';
import { Repository } from 'typeorm';
import { Sessions } from '../entities/conversation.entity';

export class TelegramService {
  logger = new Logger(TelegramService.name);
  bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

  constructor(
    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,
    private botExecutionService: BotExecutionService,
  ) {}

  private listenMessage() {
    this.bot.on('message:text', (ctx) => {
      this.logger.debug(`Received message: ${ctx.update.message.text}`);
      const chatId = ctx.update.message.chat.id;
      this.botExecutionService.startBotExecution({
        from: chatId.toString(),
        body: ctx.update.message.text,
        provider: ProvidersEnum.TELEGRAM,
      });
    });
  }

  startBot() {
    this.listenMessage();
    this.bot.start();
  }
}
