import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(['business_id', 'phone'], { unique: true })
export class Customer extends BaseEntity {
  @Column({ unique: false })
  phone: string;

  @Column({ nullable: false })
  business_id: number;

  @Column({ nullable: true })
  name: string;
}
