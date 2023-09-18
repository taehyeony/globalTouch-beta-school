import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { IAuthUser, IContext } from 'src/common/interfaces/context';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  context: IContext;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}

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

    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.user_id },
      { secret: process.env.PASSPORT_JWT_REFRESH_SECRET_KEY, expiresIn: '2w' },
    );

    context.res.setHeader(
      'set-cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.user_id },
      { secret: process.env.PASSPORT_JWT_ACCESS_SECRET_KEY, expiresIn: '15s' },
    );
  }
}
