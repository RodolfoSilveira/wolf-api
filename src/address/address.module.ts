import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entity/address.entity';
import { Company } from '../company/entity/company.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, Company]),
    forwardRef(() => CompanyModule)
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService]
})
export class AddressModule {}
