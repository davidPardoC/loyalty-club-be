import { Test, TestingModule } from '@nestjs/testing';
import { MessageLogsController } from './message-logs.controller';
import { MessageLogsService } from './message-logs.service';

describe('MessageLogsController', () => {
  let controller: MessageLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageLogsController],
      providers: [MessageLogsService],
    }).compile();

    controller = module.get<MessageLogsController>(MessageLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
