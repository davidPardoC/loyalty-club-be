import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotStepsService } from '../bot-steps/bot-steps.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entities/bot.entity';

@Injectable()
export class BotsService {
  constructor(
    @InjectRepository(Bot) private botRepository: Repository<Bot>,
    private readonly botStepService: BotStepsService,
  ) {}

  async create(createBotDto: CreateBotDto) {
    const bot = await this.botRepository.save({
      name: createBotDto.name,
      description: createBotDto.description,
    });

    await Promise.all(
      createBotDto.steps.map(async (step) =>
        this.botStepService.createStep(step, bot),
      ),
    );

    return bot;
  }

  findAll() {
    return `This action returns all bots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bot`;
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${updateBotDto} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }

  findAllActive() {
    return this.botRepository.find({
      where: { active: true },
      relations: ['bot_steps'],
    });
  }
}
