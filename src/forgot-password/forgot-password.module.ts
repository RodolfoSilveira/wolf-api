import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule {}
