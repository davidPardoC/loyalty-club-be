import { Controller } from '@nestjs/common';
import { HabilitiesService } from './habilities.service';

@Controller('habilities')
export class HabilitiesController {
  constructor(private readonly habilitiesService: HabilitiesService) {}
}
