import { Test, TestingModule } from '@nestjs/testing';
import { MessageLogsService } from './message-logs.service';

describe('MessageLogsService', () => {
  let service: MessageLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageLogsService],
    }).compile();

    service = module.get<MessageLogsService>(MessageLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
