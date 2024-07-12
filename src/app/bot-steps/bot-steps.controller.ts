import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotStepsService } from './bot-steps.service';
import { CreateBotStepDto } from './dto/create-bot-step.dto';
import { UpdateBotStepDto } from './dto/update-bot-step.dto';

@Controller('bot-steps')
export class BotStepsController {
  constructor(private readonly botStepsService: BotStepsService) {}

  @Post()
  create(@Body() createBotStepDto: CreateBotStepDto) {
    return this.botStepsService.create(createBotStepDto);
  }

  @Get()
  findAll() {
    return this.botStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botStepsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotStepDto: UpdateBotStepDto) {
    return this.botStepsService.update(+id, updateBotStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botStepsService.remove(+id);
  }
}
