import { Logger } from '@nestjs/common';
import { Sessions } from 'src/app/conversations/entities/conversation.entity';
import { Repository } from 'typeorm';
import { BotStep } from '../entities/bot-step.entity';
import { StepExecutionContext } from '../interfaces/step-execution-context.interface';
import { BaseStepHandler } from './base-step.handler';

export class EndStepHandler extends BaseStepHandler {
  logger = new Logger(EndStepHandler.name);
  sessionRepository: Repository<Sessions> =
    this.dataSource.getRepository(Sessions);

  async executeStep(
    step: BotStep,
    stepExecutionContext: StepExecutionContext,
    message: string,
  ): Promise<void> {
    await this.messagingProvider.sendMessage(
      message ? message : step.default_response,
      stepExecutionContext.session.customer_phone,
    );
    this.sessionRepository.update(
      { id: stepExecutionContext.session.id },
      { active: false },
    );
  }
}
