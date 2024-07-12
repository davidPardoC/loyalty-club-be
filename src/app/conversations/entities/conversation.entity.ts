import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Sessions extends BaseEntity {
  @Column()
  customer_phone: string;

  @Column()
  bot_id: number;
}
