import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { BotStepsModule } from './app/bot-steps/bot-steps.module';
import { BotStep } from './app/bot-steps/entities/bot-step.entity';
import { BotsModule } from './app/bots/bots.module';
import { Bot } from './app/bots/entities/bot.entity';
import { ConversationsListenerService } from './app/conversations/conversations-listener.service';
import { ConversationsModule } from './app/conversations/conversations.module';
import { Sessions } from './app/conversations/entities/conversation.entity';
import { CustomersModule } from './app/customers/customers.module';
import { Customer } from './app/customers/entities/customer.entity';
import { MessageLog } from './app/message-logs/entities/message-log.entity';
import { MessageLogsModule } from './app/message-logs/message-logs.module';
import { User } from './app/users/entities/user.entity';
import { UsersModule } from './app/users/users.module';
import configuration from './config/configuration';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UsersModule,
    ConversationsModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [User, Customer, Bot, BotStep, MessageLog, Sessions],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    CustomersModule,
    BotsModule,
    BotStepsModule,
    MessageLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConversationsListenerService],
})
export class AppModule {}
