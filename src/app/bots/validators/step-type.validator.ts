import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { StepDto } from '../dto/create-bot.dto';

interface TypeValidator {
  isValid: boolean;
  message: string;
}

@ValidatorConstraint({ name: 'stepTypeValidator', async: false })
export class StepTypeValidator implements ValidatorConstraintInterface {
  currentStep: StepDto;
  message: string;

  validate(steps: StepDto[]) {
    for (const step of steps) {
      this.currentStep = step;
      switch (step.type) {
        case BotStepType.TRIGGER:
          const { isValid, message } = this.validateTriggerType(step);
          this.message = message;
          return isValid;
        default:
          return true;
      }
    }
    return true;
  }

  defaultMessage(): string {
    return `Invalid step: ${this.currentStep.step} - ${this.message}`;
  }

  validateTriggerType(step: StepDto): TypeValidator {
    return {
      isValid: step.keywords.length > 0,
      message: 'Matchers are required',
    };
  }
}
