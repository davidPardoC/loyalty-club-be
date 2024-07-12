import { BotStep } from 'src/app/bot-steps/entities/bot-step.entity';
import { BaseEntity } from 'src/app/common/entities/base-entity';
import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Bot extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => BotStep, (botStep) => botStep.bot)
  botSteps: BotStep[];

  @ManyToOne(() => User, (user) => user.bots)
  user: User;
}
