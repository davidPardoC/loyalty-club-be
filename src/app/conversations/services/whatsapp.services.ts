import { Injectable, Logger } from '@nestjs/common';
import { BotExecutionService } from 'src/app/bots/services/bot-execution.service';
import { CustomersService } from 'src/app/customers/customers.service';
import { ProvidersEnum } from 'src/app/providers/constants/provider.enum';
import { WhatsappWebhookDto } from '../dtos/whatsapp-webhook.dto';

@Injectable()
export class WhatsappService {
  logger = new Logger(WhatsappService.name);

  constructor(
    private customerService: CustomersService,
    private botExecutionService: BotExecutionService,
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
    await this.botExecutionService.startBotExecution({
      from,
      body,
      provider: ProvidersEnum.MOCK,
    });
    return { status: 'ok' };
  }
}
