import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BotStep } from 'src/app/bot-steps/entities/bot-step.entity';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { stepHandlerFactory } from 'src/app/bot-steps/factories/step-handler.factory';
import { Sessions } from 'src/app/conversations/entities/conversation.entity';
import { MessageLog } from 'src/app/message-logs/entities/message-log.entity';
import { MessageLogsService } from 'src/app/message-logs/message-logs.service';
import { ProvidersEnum } from 'src/app/providers/constants/provider.enum';
import { SESSIONS } from 'src/constants/sessions';
import { substractHours } from 'src/utils/dates';
import { containsKeyword } from 'src/utils/text';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { BotsService } from '../bots.service';
import { Bot } from '../entities/bot.entity';

interface startBotExecutionArgs {
  from: string;
  body: string;
  provider: ProvidersEnum;
}

@Injectable()
export class BotExecutionService {
  logger = new Logger(BotExecutionService.name);
  constructor(
    private readonly botService: BotsService,
    private readonly messageLogService: MessageLogsService,
    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,
    @InjectRepository(BotStep) private botStepRepository: Repository<BotStep>,
    private dataSource: DataSource,
  ) {}

  async startBotExecution({ from, body, provider }: startBotExecutionArgs) {
    const activeBots = await this.botService.findAllActive();
    const triggers = activeBots
      .map((bot) => bot.bot_steps.map((step) => ({ ...step, bot })))
      .flat()
      .filter((step) => step.type === BotStepType.TRIGGER);

    await Promise.all(
      triggers.map(async (trigger) => {
        let message = body;
        let activeSession = await this.hasActiveSession(from, trigger.bot.id);
        const paramDivider = trigger.params?.param_divider;
        const params = {};

        if (paramDivider) {
          const param = body.split(paramDivider)[1];
          message = body.split(paramDivider)[0];
          if (param) {
            params['param'] = param;
          }
        }

        const matchKeyword = containsKeyword(message, trigger.keywords);

        if (!activeSession && matchKeyword) {
          activeSession = await this.handleTrigger(
            from,
            message,
            trigger,
            provider,
            params,
          );
        } else if (activeSession) {
          const lastMessage = await this.getLastMessage(
            from,
            trigger.bot.id,
            activeSession.id,
          );
          this.executeNextStep(
            lastMessage,
            trigger.bot,
            body,
            from,
            provider,
            activeSession,
          );
        }
      }),
    );
  }

  private async handleTrigger(
    from: string,
    message: string,
    trigger: BotStep & { bot: Bot },
    provider: ProvidersEnum,
    inputParams?: Record<string, string>,
  ) {
    const session = await this.sessionsRepository.save({
      customer_phone: from,
      bot_id: trigger.bot.id,
      provider,
      active: true,
    });
    await this.messageLogService.create({
      message,
      executed_step: trigger.step,
      sender: from,
      next_step: trigger.next_step,
      session_id: session.id,
      bot_id: trigger.bot.id,
    });
    const nextStep = await this.botStepRepository.findOneBy({
      step: trigger.next_step,
      bot: { id: trigger.bot.id },
    });
    const handler = stepHandlerFactory.getHandler(
      nextStep.type,
      provider,
      this.dataSource,
    );
    await handler.executeStep(
      nextStep,
      { session, bot: trigger.bot, inputParams },
      message,
    );
    return session;
  }

  hasActiveSession(from: string, botId: number) {
    const lasActiveDate = substractHours(
      new Date(),
      SESSIONS.DEFAULT_SESSION_EXPIRE_TIME_IN_HOURS,
    );
    return this.sessionsRepository.findOneBy({
      customer_phone: from,
      bot_id: botId,
      created_at: MoreThan(lasActiveDate),
      active: true,
    });
  }

  getLastMessage(from: string, botId: number, sessionId: number) {
    return this.messageLogService.getLastMessage(from, botId, sessionId);
  }

  async executeNextStep(
    lastMessage: MessageLog,
    bot: Bot,
    body: string,
    from: string,
    provider: ProvidersEnum,
    session: Sessions,
    inputParams?: Record<string, any>,
  ) {
    const currentStep = await this.botStepRepository.findOneBy({
      step: lastMessage.next_step,
      bot: { id: bot.id },
    });

    const handler = stepHandlerFactory.getHandler(
      currentStep.type,
      provider,
      this.dataSource,
    );

    await handler.executeStep(
      currentStep,
      {
        session,
        bot,
        inputParams,
      },
      body,
    );

    await this.messageLogService.create({
      bot_id: bot.id,
      message: body,
      session_id: lastMessage.session_id,
      sender: from,
      executed_step: currentStep.step,
      next_step: currentStep.next_step,
    });
  }
}
