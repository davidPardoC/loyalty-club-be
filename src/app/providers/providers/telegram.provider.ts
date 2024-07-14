import { Bot } from 'grammy';
import { MessagingProvider } from '../interfaces/messaging-provider.interface';

export class TelegramProvider implements MessagingProvider {
  bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
  async sendMessage(message: string, to: string): Promise<void> {
    await this.bot.api.sendMessage(to, message);
  }

  async sendMenu(options: string[], to: string): Promise<void> {
    await this.bot.api.sendMessage(to, 'Elije una opción:', {
      reply_markup: {
        force_reply: true,
        keyboard: options.map((option) => [{ text: option }]),
        one_time_keyboard: true,
      },
    });
  }
}
