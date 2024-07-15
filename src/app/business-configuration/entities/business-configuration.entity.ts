import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BusinessConfiguration extends BaseEntity {
  @Column()
  first_login_reward: number;
}
