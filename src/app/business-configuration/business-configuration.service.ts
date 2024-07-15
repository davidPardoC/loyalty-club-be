import { Injectable } from '@nestjs/common';
import { CreateBusinessConfigurationDto } from './dto/create-business-configuration.dto';
import { UpdateBusinessConfigurationDto } from './dto/update-business-configuration.dto';

@Injectable()
export class BusinessConfigurationService {
  create(createBusinessConfigurationDto: CreateBusinessConfigurationDto) {
    return 'This action adds a new businessConfiguration';
  }

  findAll() {
    return `This action returns all businessConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessConfiguration`;
  }

  update(id: number, updateBusinessConfigurationDto: UpdateBusinessConfigurationDto) {
    return `This action updates a #${id} businessConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessConfiguration`;
  }
}
