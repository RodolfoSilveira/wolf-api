import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../user/interface/user.interface';
import * as crypto from 'crypto';
import * as moment from 'moment';
import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
import Queue from '../lib/Queue';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<IUser>
  ){}

  async store(email: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: [{email}]});

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await this.userRepository.update({email: email}, {...user})

      await Queue.add(ForgotPasswordMail.key, {
        email,
        name: user.name,
        token: user.token
      });

    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update (token: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: [{token}]});

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        throw new UnauthorizedException();
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await this.userRepository.update({id: user.id}, {...user})
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
