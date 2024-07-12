import { Test, TestingModule } from '@nestjs/testing';
import { BotStepsService } from './bot-steps.service';

describe('BotStepsService', () => {
  let service: BotStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotStepsService],
    }).compile();

    service = module.get<BotStepsService>(BotStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
