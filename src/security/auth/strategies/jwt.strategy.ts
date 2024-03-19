import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { ClientService as UserClientService } from 'src/security/user/modules/client/services/client.service';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/shared/configs/interface';
import { ConfigKey } from 'src/shared/configs/enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtRefreshTokenStrategy.name);
  constructor(private readonly usersService: UserClientService, configService : ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //secretOrKey: process.env.JWT_SECRET || 'secret',
      secretOrKey: configService.get<Auth>(ConfigKey.AUTH).secret,
    });
    this.logger.warn('JwtStrategy initialized');
  }

  async validate(payload: JwtPayload): Promise<any> {
    this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      this.logger.error('User not found');
      throw new UnauthorizedException();
    }
    return user;
  }
}
