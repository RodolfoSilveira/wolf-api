import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entity/phone.entity';
import { Repository } from 'typeorm';
import { IPhone } from './interface/phone.interface';
import { Company } from 'src/company/entity/company.entity';
import { ICompany } from 'src/company/interface/company.interface';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone) private readonly phoneRepository: Repository<IPhone>,
    @InjectRepository(Company) private readonly companyRepository: Repository<ICompany>,
  ) {}

  async store(phone: IPhone, company: ICompany) {
    try {
      const companyId = company.id;

      const companyData = await this.companyRepository.findOne(companyId);

      if (!companyData) {
        throw new BadRequestException();
      }

      const data = await this.phoneRepository.save(phone);

      await this.phoneRepository.update(data.id, { company_id: companyData.id });

      return data;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
