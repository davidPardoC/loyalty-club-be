import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageLog } from './entities/message-log.entity';
import { MessageLogsController } from './message-logs.controller';
import { MessageLogsService } from './message-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageLog])],
  controllers: [MessageLogsController],
  providers: [MessageLogsService],
  exports: [MessageLogsService],
})
export class MessageLogsModule {}
