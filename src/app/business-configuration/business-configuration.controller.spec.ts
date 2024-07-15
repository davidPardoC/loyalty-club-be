import { Test, TestingModule } from '@nestjs/testing';
import { BusinessConfigurationController } from './business-configuration.controller';
import { BusinessConfigurationService } from './business-configuration.service';

describe('BusinessConfigurationController', () => {
  let controller: BusinessConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessConfigurationController],
      providers: [BusinessConfigurationService],
    }).compile();

    controller = module.get<BusinessConfigurationController>(BusinessConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
