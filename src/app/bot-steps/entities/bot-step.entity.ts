import { Bot } from 'src/app/bots/entities/bot.entity';
import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BotStepType } from '../enums/BotStepType.enum';

@Entity()
export class BotStep extends BaseEntity {
  @Column()
  step: number;

  @Column({ enum: BotStepType, type: 'enum' })
  type: BotStepType;

  @Column('varchar', { array: true })
  keywords: string[];

  @Column()
  default_response: string;

  @Column({ nullable: true })
  next_step: number;

  @Column({ nullable: true, type: 'jsonb' })
  params: Record<string, any>;

  @ManyToOne(() => Bot, (bot) => bot.bot_steps)
  bot: Bot;
}
