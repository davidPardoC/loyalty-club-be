import { Business } from 'src/app/business/entities/business.entity';
import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Balances extends BaseEntity {
  @Column()
  customer_phone: string;

  @Column()
  balance: number;

  @ManyToOne(() => Business, (business) => business.balances)
  bussiness: Business;
}
