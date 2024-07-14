import { ProvidersEnum } from 'src/app/providers/constants/provider.enum';
import { DataSource } from 'typeorm';
import { BotStepType } from '../enums/BotStepType.enum';
import { AbilityStepHandler } from '../handlers/ability-step.habler';
import { BaseStepHandler } from '../handlers/base-step.handler';
import { EndStepHandler } from '../handlers/end-step.handler';
import { MenuStepHandler } from '../handlers/menu-step.handler';

class StepHandlerFactory {
  handlers: Record<string, typeof BaseStepHandler> = {
    [BotStepType.END]: EndStepHandler,
    [BotStepType.MENU]: MenuStepHandler,
    [BotStepType.ABILITY]: AbilityStepHandler,
  };

  getHandler(
    stepType: BotStepType,
    provider: ProvidersEnum,
    dataSource: DataSource,
  ): BaseStepHandler {
    const handler = this.handlers[stepType];

    if (!handler) {
      throw new Error(`Handler not found for step type ${stepType}`);
    }

    return new handler(provider, dataSource);
  }
}

export const stepHandlerFactory = new StepHandlerFactory();
