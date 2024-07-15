import { Logger } from '@nestjs/common';
import { StepExecutionContext } from 'src/app/bot-steps/interfaces/step-execution-context.interface';
import { DataSource } from 'typeorm';

export interface ExecutionResponse {
  message: string;
}

export class BaseAbility {
  logger = new Logger(BaseAbility.name);
  dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async execute(
    from: string,
    message: string,
    executionContext: StepExecutionContext,
  ): Promise<ExecutionResponse> {
    this.logger.log(
      `Executing ${BaseAbility.name} hability for ${from} with message: ${message} and execution context: ${executionContext}`,
    );
    return { message: 'Base hability executed' };
  }
}
