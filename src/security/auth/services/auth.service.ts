import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ClientService as UserClientService } from 'src/security/user/modules/client/services/client.service';

import { JwtRefreshTokenStrategy } from '../strategies/jwt-refresh-token.strategy';
import { RefreshTokenIdsStorage } from '../storage/refresh-token-ids-storage';

import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { User } from 'src/security/user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(JwtRefreshTokenStrategy.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userClientService: UserClientService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) { }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUserForSignIn(
      signInDto.username,
      signInDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return await this.signAsync(user)
  }

  async signUp(signUpDto: SignUpDto) {
    if (! await this.validateUserForSignUp(signUpDto)) {
      throw new HttpException('User is already registred', HttpStatus.FORBIDDEN);
    } else {
      const user = await this.userClientService.register(signUpDto);

      if (!user) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      return await this.signAsync(user)
    }


  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken);
      await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
      const payload = { sub: decoded.sub, username: decoded.username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { access_token: accessToken };
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateToken(accessToken: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);
      await this.refreshTokenIdsStorage.invalidate(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async validateUserForSignIn(username: string, pass: string): Promise<User | null> {
    const user = await this.userClientService.findByUsername(username);
    if (user && user.validatePassword(pass)) {
      return user;
    }
    return null;
  }
  async validateUserForSignUp(signUpDto: SignUpDto): Promise<boolean> {
    const user = await this.userClientService.findByUsername(signUpDto.username);
    if (user) {
      return false;
    } else {
      return true;
    }
  }

  async signAsync(user: User) {

    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    // Store the refresh token in redis
    await this.refreshTokenIdsStorage.insert(user.id, refreshToken);

    delete user.id;
    delete user.status;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: user
    };
  }

}
