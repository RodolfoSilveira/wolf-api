import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICompany } from './interface/company.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly companyRepostiory: Repository<ICompany>
  ){}

  async store(company: ICompany) {
    try {
      
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
