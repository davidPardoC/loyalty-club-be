import { Test, TestingModule } from '@nestjs/testing';
import { HabilitiesService } from './habilities.service';

describe('HabilitiesService', () => {
  let service: HabilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabilitiesService],
    }).compile();

    service = module.get<HabilitiesService>(HabilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
