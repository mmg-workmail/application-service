import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ClientService as UserClientService } from '../user/modules/client/services/client.service';
import { ClientModule as UserClientModule } from '../user/modules/client/client.module';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshTokenIdsStorage } from './refresh-token-ids-storage';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserClientModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserClientService,

    JwtStrategy,
    RefreshTokenIdsStorage,
    JwtRefreshTokenStrategy
    
  ],
  exports: [AuthService],
})
export class AuthModule { }
