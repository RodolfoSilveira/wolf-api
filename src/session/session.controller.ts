import { Controller, Post, Body } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService
  ){}

  @Post()
  async login(@Body() user: any) {
    const { email, password } = user;
    return await this.sessionService.login(email, password);
  }
}
