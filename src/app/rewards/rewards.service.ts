import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { Reward } from './entities/reward.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
  ) {}

  create(createRewardDto: CreateRewardDto) {
    return this.rewardRepository.save(createRewardDto);
  }

  update(id: number, updateRewardDto: UpdateRewardDto) {
    return this.rewardRepository.update(id, updateRewardDto);
  }
}
