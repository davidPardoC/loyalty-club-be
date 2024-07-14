import { ProvidersEnum } from 'src/app/providers/constants/provider.enum';
import { messagingProvidersFactory } from 'src/app/providers/factories/provider.factory';
import { MessagingProvider } from 'src/app/providers/interfaces/messaging-provider.interface';
import { DataSource } from 'typeorm';
import { BotStep } from '../entities/bot-step.entity';
import { StepExecutionContext } from '../interfaces/step-execution-context.interface';

export class BaseStepHandler {
  messagingProvider: MessagingProvider;
  dataSource: DataSource;

  constructor(provider: ProvidersEnum, dataSource: DataSource) {
    this.messagingProvider = messagingProvidersFactory.getProvider(provider);
    this.dataSource = dataSource;
  }

  async executeStep(
    step: BotStep,
    stepExecutionContext: StepExecutionContext,
    message: string,
  ): Promise<void> {
    throw new Error(
      `Method not implemented for step ${step} with context ${stepExecutionContext} and message ${message}`,
    );
  }
}
