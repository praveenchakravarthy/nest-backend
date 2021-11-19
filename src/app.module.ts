import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/gaurds/roles.gaurd';
import { JwtAuthGuard } from './auth/gaurds/jwt-gaurd';
import { JwtStrategy } from './auth/gaurds/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () =>
       Object.assign(await getConnectionOptions(), {
      autoLoadEntities: true,
    }),
    }),
    UserModule,
    AuthModule,
    CustomerModule,
  ],
 
  controllers: [AppController],
  providers: [AppService, RolesGuard, JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
