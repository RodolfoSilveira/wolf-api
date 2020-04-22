import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { Phone } from './entity/phone.entity';
import { Company } from '../company/entity/company.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone, Company]),
    forwardRef(() => CompanyModule)
  ],
  controllers: [PhoneController],
  providers: [PhoneService],
  exports: [PhoneService]
})
export class PhoneModule {}
