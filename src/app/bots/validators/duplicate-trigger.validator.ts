import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { StepDto } from '../dto/create-bot.dto';

@ValidatorConstraint({ name: 'duplicateTrigger', async: false })
export class DuplicateTriggerValidator implements ValidatorConstraintInterface {
  validate(steps: StepDto[]) {
    const triggers = steps.filter((step) => step.type === BotStepType.TRIGGER);
    return triggers.length == 1;
  }

  defaultMessage(): string {
    return `Only One Trigger is allowed in the steps array.`;
  }
}
