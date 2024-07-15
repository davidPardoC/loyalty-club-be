import { BaseAbility } from 'src/app/abilities/abilities/base.ability';
import { RegisterCustomerAbility } from 'src/app/abilities/abilities/register-customer.ability';
import { RetrievePointsHability } from 'src/app/abilities/abilities/retrieve-points.abilty';
import { Abilities } from 'src/app/abilities/enums/abilities.enum';
import { Bot } from 'src/app/bots/entities/bot.entity';
import { Sessions } from 'src/app/conversations/entities/conversation.entity';
import { Repository } from 'typeorm';
import { BotStep } from '../entities/bot-step.entity';
import { stepHandlerFactory } from '../factories/step-handler.factory';
import { StepExecutionContext } from '../interfaces/step-execution-context.interface';
import { BaseStepHandler } from './base-step.handler';

export class AbilityStepHandler extends BaseStepHandler {
  abilities: Record<string, typeof BaseAbility> = {
    [Abilities.RETRIEVE_POINTS]: RetrievePointsHability,
    [Abilities.REGISTER_CUSTOMER]: RegisterCustomerAbility,
  };

  botStepRepository: Repository<BotStep> =
    this.dataSource.getRepository(BotStep);

  async executeStep(
    step: BotStep,
    stepExecutionContext: StepExecutionContext,
    message: string,
  ): Promise<void> {
    const { bot, session } = stepExecutionContext;
    const hability = new this.abilities[step.params.ability](this.dataSource);
    const response = await hability.execute(
      stepExecutionContext.session.customer_phone,
      message,
      stepExecutionContext,
    );
    await this.executeNextStep(bot, step, session, response.message);
    return;
  }

  async executeNextStep(
    bot: Bot,
    currentStep: BotStep,
    session: Sessions,
    message: string,
  ) {
    const nextStep = await this.botStepRepository.findOneBy({
      bot: { id: bot.id },
      step: currentStep.next_step,
    });

    const handler = stepHandlerFactory.getHandler(
      nextStep.type,
      session.provider,
      this.dataSource,
    );

    await handler.executeStep(nextStep, { bot, session }, message);
  }
}
