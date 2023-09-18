import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.userService.findOneByEmail({ email });

    if (!user) throw new UnprocessableEntityException('User does not exist!');

    const isAuth = await bcrypt.compare(password, user.password_hash);
    if (!isAuth) throw new UnprocessableEntityException('Wrong password!');

    this.setRefreshToken({ user, res: context.res });

    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.user_id },
      { secret: process.env.PASSPORT_JWT_REFRESH_SECRET_KEY, expiresIn: '2w' },
    );

    res.setHeader('set-cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.user_id },
      { secret: process.env.PASSPORT_JWT_ACCESS_SECRET_KEY, expiresIn: '15s' },
    );
  }
}
