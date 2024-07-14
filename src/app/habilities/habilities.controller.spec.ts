import { Test, TestingModule } from '@nestjs/testing';
import { HabilitiesController } from './habilities.controller';
import { HabilitiesService } from './habilities.service';

describe('HabilitiesController', () => {
  let controller: HabilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabilitiesController],
      providers: [HabilitiesService],
    }).compile();

    controller = module.get<HabilitiesController>(HabilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
