import { Controller, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ICompany } from './interface/company.interface';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  store(@Body() company: ICompany) {
    return this.companyService.store(company);
  }
}
