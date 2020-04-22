import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {
  Repository
} from 'typeorm';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICompany } from './interface/company.interface';
import { IUser } from '../user/interface/user.interface';
import { User } from '../user/entity/user.entity';
import { AddressService } from '../address/address.service';
import { PhoneService } from '../phone/phone.service';
import { FileService } from '../file/file.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepostiory: Repository<ICompany>,
    @InjectRepository(User)
    private readonly userRepository: Repository<IUser>,
    private readonly addressService: AddressService,
    private readonly phoneService: PhoneService,
    private readonly fileService: FileService
  ) {}

  async store(company: ICompany, req) {
    try {
      const userId = req.userId;

      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new BadRequestException();
      }

      const data = await this.companyRepostiory.save(company);

      await this.userRepository.update(user.id, { company_id: data.id });

      return data;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
