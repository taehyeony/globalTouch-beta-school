import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoole(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    let user = await this.userService.findOneByEmail({
      email: req.user.email,
    });

    if (!user) {
      user = await this.userService.createWithGoogle({
        ...req.user,
      });
    }

    this.authService.setRefreshToken({ user, res });

    // if user.countryCode is Empty
    // if (!user.countryCode) {
    //   res.redirect(process.env.PASSPORT_OAUTH_GOOGLE_REDIRECT_URL);
    // }

    res.redirect(process.env.PASSPORT_OAUTH_GOOGLE_REDIRECT_URL);
  }
}
