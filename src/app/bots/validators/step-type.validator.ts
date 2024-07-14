import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { StepDto } from '../dto/create-bot.dto';
import {
  abilitySchema,
  menuOptionsSchema,
} from '../schemas/menu-options-schema';

interface TypeValidator {
  isValid: boolean;
  message: string;
}

@ValidatorConstraint({ name: 'stepTypeValidator', async: false })
export class StepTypeValidator implements ValidatorConstraintInterface {
  currentStep: StepDto;
  message: string;

  validate(steps: StepDto[]) {
    const { isValid, message } = this.validateAll(steps);
    this.message = message;
    return isValid;
  }

  validateAll(steps: StepDto[]): TypeValidator {
    let response;
    for (const step of steps) {
      this.currentStep = step;
      switch (step.type) {
        case BotStepType.TRIGGER:
          response = this.validateTriggerType(step);
          break;
        case BotStepType.MENU:
          response = this.validateMenuType(step);
          break;
        case BotStepType.ABILITY:
          response = this.validateAbilityType(step);
          break;
      }
      if (!response.isValid) {
        break;
      }
    }
    return response;
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

  validateMenuType(step: StepDto): TypeValidator {
    const { success, error } = menuOptionsSchema.safeParse(
      step.params?.options,
    );
    return {
      isValid: success,
      message: error ? error.toString() : '',
    };
  }

  validateAbilityType(step: StepDto): TypeValidator {
    const { success, error } = abilitySchema.safeParse(step.params);
    return {
      isValid: success,
      message: error ? error.toString() : '',
    };
  }
}
