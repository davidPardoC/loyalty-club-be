import { Module } from '@nestjs/common';
import { BusinessConfigurationService } from './business-configuration.service';
import { BusinessConfigurationController } from './business-configuration.controller';

@Module({
  controllers: [BusinessConfigurationController],
  providers: [BusinessConfigurationService],
})
export class BusinessConfigurationModule {}
