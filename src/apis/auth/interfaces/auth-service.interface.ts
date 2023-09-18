import { Response } from 'express';
import { User } from 'src/apis/user/entities/user.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';

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
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}
