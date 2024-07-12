import { Body, Controller, Post } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { WhatsappWebhookDto } from './dtos/whatsapp-webhook.dto';
import { WhatsappService } from './services/whatsapp.services';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly whatsAppService: WhatsappService,
  ) {}

  @Post('/whatsapp/webhook')
  async webhook(@Body() body: WhatsappWebhookDto) {
    return this.whatsAppService.webhook(body);
  }
}
