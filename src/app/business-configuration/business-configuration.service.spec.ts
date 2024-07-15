import { Test, TestingModule } from '@nestjs/testing';
import { BusinessConfigurationService } from './business-configuration.service';

describe('BusinessConfigurationService', () => {
  let service: BusinessConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessConfigurationService],
    }).compile();

    service = module.get<BusinessConfigurationService>(BusinessConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
