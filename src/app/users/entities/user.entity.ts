import { Bot } from 'src/app/bots/entities/bot.entity';
import { BaseEntity } from 'src/app/common/entities/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  picture: string;

  @Column()
  auth_provider: string;

  @Column()
  refresh_token: string;

  @OneToMany(() => Bot, (bot) => bot.user)
  bots: Bot[];
}
