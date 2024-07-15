import { Balances } from 'src/app/balances/entities/balance.entity';
import { Repository } from 'typeorm';
import { BaseAbility } from './base.ability';

export class RetrievePointsHability extends BaseAbility {
  balancesRepository: Repository<Balances> =
    this.dataSource.getRepository(Balances);

  async execute(from: string) {
    const balance = await this.balancesRepository.find({
      where: {
        customer_phone: from,
      },
      relations: ['bussiness'],
    });
    return {
      message: this.buildResponse(balance),
    };
  }

  buildResponse(balance: Balances[]) {
    if (!balance) {
      return 'No tienes puntos acumulados.';
    }
    let message = `\*Tienes los siguientes puntos acumulados:* \n\n`;

    balance.forEach((b, idx) => {
      message += ` \\ \*${idx + 1}\\.* ${b.balance} puntos en ${b.bussiness.name} \n`;
    });

    message += `\n ¡Sigue acumulando más puntos\\! \n ¿Quieres canjearlos? \n responde con "Canjear" \n`;
    return message;
  }
}
