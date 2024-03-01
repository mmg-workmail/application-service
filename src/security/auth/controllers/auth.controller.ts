import { Controller, Body, Post, UseGuards, Headers, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
