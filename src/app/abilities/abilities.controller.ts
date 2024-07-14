import { Controller } from '@nestjs/common';
import { HabilitiesService } from './abilities.service';

@Controller('habilities')
export class HabilitiesController {
  constructor(private readonly habilitiesService: HabilitiesService) {}
}
