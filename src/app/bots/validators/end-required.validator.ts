import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { StepDto } from '../dto/create-bot.dto';

@ValidatorConstraint({ name: 'endRequiredValidator', async: false })
export class EndRequiredValidator implements ValidatorConstraintInterface {
  message: string;
  validate(steps: StepDto[]) {
    const endSteps = steps.filter((step) => step.type === BotStepType.END);
    const notNullEndSteps = endSteps.filter((step) => step.nextStep !== null);
    if (endSteps.length < 1) {
      this.message = 'At least one End step is required in the steps array.';
      return false;
    }
    if (notNullEndSteps.length > 0) {
      this.message = 'End steps cannot have a nextStep.';
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return this.message;
  }
}
