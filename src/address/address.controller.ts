import { Controller, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { Company } from 'src/company/entity/company.entity';
import { IAddress } from './interface/address.interface';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService){}

  @Post()
  store(@Body() address: IAddress, @Body() company: Company) {
    return this.addressService.store(address, company)
  }
}
