import { Test, TestingModule } from '@nestjs/testing';
import { BotStepsController } from './bot-steps.controller';
import { BotStepsService } from './bot-steps.service';

describe('BotStepsController', () => {
  let controller: BotStepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotStepsController],
      providers: [BotStepsService],
    }).compile();

    controller = module.get<BotStepsController>(BotStepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
