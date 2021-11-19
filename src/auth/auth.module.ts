import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './gaurds/jwt-gaurd';
import { JwtStrategy } from './gaurds/jwt.strategy';
import { RolesGuard } from './gaurds/roles.gaurd';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        ConfigModule,
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService : ConfigService) => ({
                
                    secret: configService.get("JWT_SECRET"),
                    signOptions: {
                        expiresIn: '100s'
                    }
            })
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard,JwtStrategy,ConfigService],
    exports: [AuthService]
})
export class AuthModule {
    
}
