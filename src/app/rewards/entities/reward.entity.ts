import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rewards' })
export class Reward extends BaseEntity {
  @Column()
  tenant_id: number;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  points_cost: number;
}
