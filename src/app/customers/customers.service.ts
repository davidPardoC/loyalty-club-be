import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save({ phone: createCustomerDto.from });
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer with ${JSON.stringify(updateCustomerDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  upsert(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.upsert({ phone: createCustomerDto.from }, [
      'phone',
    ]);
  }
}
