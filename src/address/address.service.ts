import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';
import { IAddress } from './interface/address.interface';
import { Company } from 'src/company/entity/company.entity';
import { ICompany } from 'src/company/interface/company.interface';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<IAddress>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<ICompany>,
  ) {}

  async store(address: IAddress, company: ICompany) {
    try {
      const companyId = company.id;

      const companyData = await this.companyRepository.findOne(companyId);

      if (!companyData) {
        throw new BadRequestException();
      }

      const data = await this.addressRepository.save(address);

      await this.addressRepository.update(data.id, { company_id: companyData.id });

      return data;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
