import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Business extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  phone: string;

  @Column()
  email: string;
}
