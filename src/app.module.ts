import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TokensModule } from './token/tokens.module';
import { CompanyModule } from './company/company.module';
import { PhoneModule } from './phone/phone.module';
import { AddressModule } from './address/address.module';
import { FileModule } from './file/file.module';
import { TaskModule } from './task/task.module';
import { AuthMiddleware } from './auth.middleware';
import { SessionModule } from './session/session.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

const routes = ['task', 'phone', 'file', 'company', 'address'];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    TokensModule,
    CompanyModule,
    PhoneModule,
    AddressModule,
    FileModule,
    TaskModule,
    SessionModule,
    ForgotPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...routes);
  }
}
