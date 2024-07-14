import { BaseEntity } from 'src/app/common/entities/base-entity';
import { ProvidersEnum } from 'src/app/providers/constants/provider.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class Sessions extends BaseEntity {
  @Column({ nullable: true })
  customer_phone: string;

  @Column()
  bot_id: number;

  @Column({ nullable: true })
  provider_chat_id: string;

  @Column({ enum: ProvidersEnum })
  provider: ProvidersEnum;

  @Column()
  active: boolean;
}
