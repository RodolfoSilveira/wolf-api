import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return this.userService.findAll();
  }

  @Get(':id')
  async show(@Param() params: any) {
    return this.userService.findOne(params.id)
  }

  @Post()
  async store(@Body() user: IUser) {
    return this.userService.store(user);
  }

  @Put(':id')
  async update(@Param() params: any, @Body() user: IUser) {
    return this.userService.update(params.id, user)
  }

  @Delete(':id')
  async destroy(@Param() params: any) {
    return this.userService.delete(params.id)
  }
}
