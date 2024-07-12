import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/v1/callback')
  @UseGuards(AuthGuard('google'))
  @Redirect('http://192.168.1.86:3001/auth/success')
  async googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'No user from google';
    }

    const { access_token, refresh_token } =
      await this.googleAuthService.googleLogin(req.user);

    const redirectUrl = new URL(
      `http://192.168.1.86:3001/auth/success?access_token=${access_token}&refresh_token=${refresh_token}`,
    );
    return {
      url: redirectUrl.toString(),
    };
  }
}
