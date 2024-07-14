import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMessageLogDto } from './dto/update-message-log.dto';
import { MessageLog } from './entities/message-log.entity';

@Injectable()
export class MessageLogsService {
  constructor(
    @InjectRepository(MessageLog)
    private messageLogRepository: Repository<MessageLog>,
  ) {}

  create(messageLog: Partial<MessageLog>) {
    return this.messageLogRepository.save(messageLog);
  }

  findAll() {
    return `This action returns all messageLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageLog`;
  }

  update(id: number, updateMessageLogDto: UpdateMessageLogDto) {
    return `This action updates a #${id} messageLog ${updateMessageLogDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageLog`;
  }

  getLastMessage(from: string, botId: number, sessionId: number) {
    return this.messageLogRepository.findOne({
      where: { sender: from, session_id: sessionId, bot_id: botId },
      order: { created_at: 'DESC' },
    });
  }
}
