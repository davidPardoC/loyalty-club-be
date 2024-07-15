import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessConfigurationDto } from './create-business-configuration.dto';

export class UpdateBusinessConfigurationDto extends PartialType(CreateBusinessConfigurationDto) {}
