import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BotStep } from 'src/app/bot-steps/entities/bot-step.entity';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { BotsService } from 'src/app/bots/bots.service';
import { Bot } from 'src/app/bots/entities/bot.entity';
import { CustomersService } from 'src/app/customers/customers.service';
import { MessageLogsService } from 'src/app/message-logs/message-logs.service';
import { containsKeyword } from 'src/utils/text';
import { Repository } from 'typeorm';
import { WhatsappWebhookDto } from '../dtos/whatsapp-webhook.dto';
import { Sessions } from '../entities/conversation.entity';

@Injectable()
export class WhatsappService {
  logger = new Logger(WhatsappService.name);

  constructor(
    private customerService: CustomersService,
    private botService: BotsService,
    private messageLogService: MessageLogsService,
    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,
  ) {}

  async webhook(body: WhatsappWebhookDto) {
    if (!this.shouldHandleMessage(body)) {
      this.logger.debug('Not handling message');
      return;
    }
    const change = body.entry[0].changes[0];
    await this.upsertCustomer(change.value.messages[0].from);
    await this.handleTextMessage(
      change.value.messages[0].from,
      change.value.messages[0].text.body,
    );
    return { status: 'ok' };
  }

  private shouldHandleMessage(body: WhatsappWebhookDto) {
    return body.entry[0].changes[0].field === 'messages';
  }

  private upsertCustomer(from: string) {
    return this.customerService.upsert({ from });
  }

  private async handleTextMessage(from: string, body: string) {
    await this.validateTriggers(from, body);
  }

  private async validateTriggers(from: string, body: string) {
    const activeBots = await this.botService.findAllActive();
    const triggers = activeBots
      .map((bot) => bot.botSteps.map((step) => ({ ...step, bot })))
      .flat()
      .filter((step) => step.type === BotStepType.TRIGGER);

    await Promise.all(
      triggers.map(async (trigger) => {
        if (containsKeyword(body, trigger.keywords)) {
          await this.handleTrigger(from, body, trigger);
        }
      }),
    );
  }

  private async handleTrigger(
    from: string,
    message: string,
    trigger: BotStep & { bot: Bot },
  ) {
    Promise.all([
      this.sessionsRepository.save({
        customer_phone: from,
        bot_id: trigger.bot.id,
      }),
      this.messageLogService.create({
        message,
        current_step: trigger.step,
        sender: from,
        next_step: trigger.next_step,
      }),
    ]);
  }

  hasActiveSession(from: string) {
    return this.sessionsRepository.findOneBy({ customer_phone: from });
  }
}
