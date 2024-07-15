import { Balances } from 'src/app/balances/entities/balance.entity';
import { StepExecutionContext } from 'src/app/bot-steps/interfaces/step-execution-context.interface';
import { Business } from 'src/app/business/entities/business.entity';
import { Customer } from 'src/app/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { BaseAbility, ExecutionResponse } from './base.ability';

export class RegisterCustomerAbility extends BaseAbility {
  customersRepository: Repository<Customer> =
    this.dataSource.getRepository(Customer);
  businessRepository: Repository<Business> =
    this.dataSource.getRepository(Business);
  balancesRepository: Repository<Balances> =
    this.dataSource.getRepository(Balances);

  async execute(
    from: string,
    message: string,
    executionContext: StepExecutionContext,
  ): Promise<ExecutionResponse> {
    try {
      const business = await this.businessRepository.findOne({
        where: { name: executionContext.inputParams.param },
        relations: ['configuration'],
      });

      await Promise.all([
        this.customersRepository.save({
          phone: from,
          business_id: business.id,
        }),
        this.balancesRepository.save({
          balance: business.configuration.first_login_reward,
          business_id: business.id,
          customer_phone: from,
        }),
      ]);

      return {
        message: `Hola 🎉, gracias por registrate en ${executionContext.inputParams.param} te hemos obsequiado ${business.configuration.first_login_reward} puntos de bienvenida.`,
      };
    } catch (error) {
      return {
        message: `Hola 🎉 Ya te encuentras registrado en ${executionContext.inputParams.param}.`,
      };
    }
  }
}
