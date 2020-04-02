import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { IUser } from '../user/interface/user.interface';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService ){}

  @Post()
  store(@Body() user: IUser) {
    return this.forgotPasswordService.store(user.email);
  }

  @Put(':token')
  update(@Param() params: any, @Body() user: IUser) {
    return this.forgotPasswordService.update(params.token, user.password);
  }
}
