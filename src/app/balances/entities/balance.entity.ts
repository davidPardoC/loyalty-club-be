import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Balances extends BaseEntity {
  @Column()
  customer_phone: string;

  @Column()
  balance: number;

  @Column()
  business_id: number;
}
