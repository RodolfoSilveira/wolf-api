import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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

type UserTypes = {
  name: string,
    password: string,
    email: string,
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<IUser>
  ){}

  async findAll(): Promise<IUser[]> {
    try {
      return await this.userRepository.find()
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async findOne(user: IUser): Promise<IUser> {
    try {
      return await this.userRepository.findOne(user)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async store(users: IUser): Promise<Data> {
    try {
      const { name, password, email } = users

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const user = await this.userRepository.save({name, email, password: hash})

      user.password = undefined

      const dados = { user, token: generateToken({ id: user.id })}

      return dados
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async update(id: IUser, users: IUser): Promise<UserTypes> {
    try{
      const { name, password, email } = users

      const user = await this.userRepository.findOne(id)

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const updateField = {name, email, password: hash}

      const data = await this.userRepository.save({...user, ...updateField })

      data.password = undefined

      return data;
    }catch(err){
      throw new InternalServerErrorException(err.message)
    }
  }

  async delete(id: IUser): Promise<void> {
    try {
      await this.userRepository.delete(id)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
