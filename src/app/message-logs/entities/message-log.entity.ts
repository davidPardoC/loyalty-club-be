import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MessageLog extends BaseEntity {
  @Column()
  message: string;

  @Column()
  sender: string;

  @Column()
  current_step: number;

  @Column()
  next_step: number;
}
