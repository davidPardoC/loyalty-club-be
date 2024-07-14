import { Balances } from 'src/app/balances/entities/balance.entity';
import { Repository } from 'typeorm';
import { BaseHability } from './base.hability';

export class RetrievePointsHability extends BaseHability {
  balancesRepository: Repository<Balances> =
    this.dataSource.getRepository(Balances);

  async execute(from: string) {
    const balance = await this.balancesRepository.findOneBy({
      customer_phone: from,
    });
    return {
      message: this.buildResponse(balance),
    };
  }

  buildResponse(balance: Balances) {
    if (!balance) {
      return 'No tienes puntos acumulados.';
    }
    return `Tienes un total de ${balance.balance} puntos.`;
  }
}
