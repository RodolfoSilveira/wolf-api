import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { Address } from '../address/entity/address.entity';
import { AddressModule } from '../address/address.module';
import { Phone } from '../phone/entity/phone.entity';
import { PhoneModule } from '../phone/phone.module';
import { File } from '../file/entity/file.entity';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';
import { AddressService } from '../address/address.service';
import { PhoneService } from '../phone/phone.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User, Address, Phone, File]),
    UserModule,
    AddressModule,
    PhoneModule,
    FileModule,
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    FileService,
    AddressService,
    PhoneService
  ],
})
export class CompanyModule {}
