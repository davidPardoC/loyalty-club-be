import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface ExecutionResponse {
  message: string;
}

export class BaseHability {
  logger = new Logger(BaseHability.name);
  dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async execute(from: string): Promise<ExecutionResponse> {
    this.logger.log(`Executing ${BaseHability.name} hability for ${from}`);
    return { message: 'Base hability executed' };
  }
}
