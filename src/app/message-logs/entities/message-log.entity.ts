import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MessageLog extends BaseEntity {
  @Column()
  message: string;

  @Column()
  sender: string;

  @Column()
  executed_step: number;

  @Column({ nullable: true })
  next_step: number;

  @Column()
  session_id: number;

  @Column()
  bot_id: number;

  @Column({ nullable: true, type: 'jsonb' })
  input: Record<string, any>;
}
