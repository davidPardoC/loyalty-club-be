import { Balances } from 'src/app/balances/entities/balance.entity';
import { BusinessConfiguration } from 'src/app/business-configuration/entities/business-configuration.entity';
import { BaseEntity } from 'src/app/common/entities/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class Business extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lng: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => BusinessConfiguration)
  @JoinColumn()
  configuration: BusinessConfiguration;

  @ManyToOne(() => Balances, (balance) => balance.bussiness)
  @JoinTable()
  balances: Balances[];
}
