import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ClientService as UserClientService } from '../user/modules/client/services/client.service';
import { ClientModule as UserClientModule } from '../user/modules/client/client.module';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { RefreshTokenIdsStorage } from './storage/refresh-token-ids-storage';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/shared/configs/enum';
import { Auth } from 'src/shared/configs/interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserClientModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const authConfig = configService.get<Auth>(ConfigKey.AUTH)
        return {
          secret: authConfig.secret,
          signOptions: {
              expiresIn: authConfig.expiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserClientService,

    JwtStrategy,
    JwtRefreshTokenStrategy,
    RefreshTokenIdsStorage,

  ],
  exports: [AuthService],
})
export class AuthModule { }
