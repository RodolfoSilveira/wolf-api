import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../user/interface/user.interface';

function generateToken (params = {}): string {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400
  })
}

type Data = {
  user: {
    name: string,
    password: string,
    email: string,
  }
  token: string,
}

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<IUser>
  ){}

  async login(email: string, password: string): Promise<Data> {
    try {
      const user = await this.userRepository.findOne({ where: [{email}]});

      if (!user) {
        throw new UnauthorizedException();
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw new UnauthorizedException();
      }

      user.password = undefined

      return { user, token: generateToken({ id: user.id }) }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
