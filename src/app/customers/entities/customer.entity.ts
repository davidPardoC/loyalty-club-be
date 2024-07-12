import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  name: string;
}
