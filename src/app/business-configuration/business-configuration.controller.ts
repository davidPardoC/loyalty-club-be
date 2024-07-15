import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessConfigurationService } from './business-configuration.service';
import { CreateBusinessConfigurationDto } from './dto/create-business-configuration.dto';
import { UpdateBusinessConfigurationDto } from './dto/update-business-configuration.dto';

@Controller('business-configuration')
export class BusinessConfigurationController {
  constructor(private readonly businessConfigurationService: BusinessConfigurationService) {}

  @Post()
  create(@Body() createBusinessConfigurationDto: CreateBusinessConfigurationDto) {
    return this.businessConfigurationService.create(createBusinessConfigurationDto);
  }

  @Get()
  findAll() {
    return this.businessConfigurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessConfigurationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessConfigurationDto: UpdateBusinessConfigurationDto) {
    return this.businessConfigurationService.update(+id, updateBusinessConfigurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessConfigurationService.remove(+id);
  }
}
