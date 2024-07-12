import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepDto } from '../bots/dto/create-bot.dto';
import { Bot } from '../bots/entities/bot.entity';
import { CreateBotStepDto } from './dto/create-bot-step.dto';
import { UpdateBotStepDto } from './dto/update-bot-step.dto';
import { BotStep } from './entities/bot-step.entity';

@Injectable()
export class BotStepsService {
  constructor(
    @InjectRepository(BotStep) private botStepRepository: Repository<BotStep>,
  ) {}

  create(createBotStepDto: CreateBotStepDto) {
    return `This action adds a new botStep ${createBotStepDto}`;
  }

  findAll() {
    return `This action returns all botSteps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} botStep`;
  }

  update(id: number, updateBotStepDto: UpdateBotStepDto) {
    return `This action updates a #${updateBotStepDto} botStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} botStep`;
  }

  createStep(step: StepDto, bot: Bot) {
    return this.botStepRepository.save({ ...step, bot });
  }
}
