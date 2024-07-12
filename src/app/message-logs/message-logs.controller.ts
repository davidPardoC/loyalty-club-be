import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMessageLogDto } from './dto/create-message-log.dto';
import { UpdateMessageLogDto } from './dto/update-message-log.dto';
import { MessageLogsService } from './message-logs.service';

@Controller('message-logs')
export class MessageLogsController {
  constructor(private readonly messageLogsService: MessageLogsService) {}

  @Post()
  create(@Body() createMessageLogDto: CreateMessageLogDto) {
    return '';
  }

  @Get()
  findAll() {
    return this.messageLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageLogsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageLogDto: UpdateMessageLogDto,
  ) {
    return this.messageLogsService.update(+id, updateMessageLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageLogsService.remove(+id);
  }
}
