import { Controller, Post, Body, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ICompany } from './interface/company.interface';
import { Request } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  store(@Body() company: ICompany, @Req() req: Request) {
    return this.companyService.store(company, req);
  }
}
