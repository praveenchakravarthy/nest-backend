import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './controller/customer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerEntity } from './models/customer.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CustomerEntity]),
    AuthModule,
    UserModule
  ],
  providers: [CustomerService,ConfigService],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
