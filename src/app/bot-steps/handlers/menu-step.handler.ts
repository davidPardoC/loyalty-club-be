import { Logger } from '@nestjs/common';
import { Bot } from 'src/app/bots/entities/bot.entity';
import { Sessions } from 'src/app/conversations/entities/conversation.entity';
import { MessageLog } from 'src/app/message-logs/entities/message-log.entity';
import { Repository } from 'typeorm';
import { BotStep } from '../entities/bot-step.entity';
import { stepHandlerFactory } from '../factories/step-handler.factory';
import { StepExecutionContext } from '../interfaces/step-execution-context.interface';
import { BaseStepHandler } from './base-step.handler';

export class MenuStepHandler extends BaseStepHandler {
  logger = new Logger(MenuStepHandler.name);

  messageRepository: Repository<MessageLog> =
    this.dataSource.getRepository(MessageLog);
  botStepRepository: Repository<BotStep> =
    this.dataSource.getRepository(BotStep);

  async executeStep(
    step: BotStep,
    stepExecutionContext: StepExecutionContext,
    message: string,
  ): Promise<void> {
    const { bot, session } = stepExecutionContext;

    const foundOption = step.params.options.find(
      (option) => option.text === message,
    );

    if (foundOption) {
      this.executeStepOption(bot, session, foundOption, step.step);
      return;
    }

    await this.messagingProvider.sendMenu(
      step.params.options.map((option) => option.text),
      stepExecutionContext.session.customer_phone,
    );
    await this.messageRepository.save({
      bot_id: bot.id,
      session_id: stepExecutionContext.session.id,
      message: 'Menu enviado',
      next_step: step.step,
      sender: 'bot',
      executed_step: step.step,
    });
  }

  async executeStepOption(
    bot: Bot,
    session: Sessions,
    option: { text: string; next_step: number },
    currentStep: number,
  ) {
    await this.messageRepository.save({
      bot_id: bot.id,
      session_id: session.id,
      message: option.text,
      next_step: option.next_step,
      sender: 'bot',
      executed_step: currentStep,
    });
    const nextStep = await this.botStepRepository.findOneBy({
      bot: { id: bot.id },
      step: option.next_step,
    });

    const handler = stepHandlerFactory.getHandler(
      nextStep.type,
      session.provider,
      this.dataSource,
    );

    await handler.executeStep(nextStep, { bot, session }, option.text);
  }
}
