import { Bot } from 'src/app/bots/entities/bot.entity';
import { Sessions } from 'src/app/conversations/entities/conversation.entity';

export interface StepExecutionContext {
  session: Sessions;
  bot: Bot;
  inputParams?: Record<string, any>;
}
