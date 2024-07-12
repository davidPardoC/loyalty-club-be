import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { BotStepType } from 'src/app/bot-steps/enums/BotStepType.enum';
import { DuplicateTriggerValidator } from '../validators/duplicate-trigger.validator';
import { EndRequiredValidator } from '../validators/end-required.validator';
import { StepTypeValidator } from '../validators/step-type.validator';

export class CreateBotDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  @Validate(DuplicateTriggerValidator)
  @Validate(StepTypeValidator)
  @Validate(EndRequiredValidator)
  steps: StepDto[];
}

export class StepDto {
  @IsInt()
  step: number;

  @IsEnum(BotStepType)
  type: BotStepType;

  @IsArray()
  keywords: string[];

  @IsString()
  defaultResponse: string;

  @IsInt()
  @IsOptional()
  nextStep: number;
}
