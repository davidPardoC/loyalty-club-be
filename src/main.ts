import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './app/conversations/services/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const telegramService = app.get<TelegramService>(TelegramService);
  telegramService.startBot();
  await app.listen(3000);
}
bootstrap();
