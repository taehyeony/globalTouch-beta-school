import { IContext } from 'src/common/interfaces/context';
import { SignupWithEmailInput } from '../dto/signupWithEmail.input';

export interface IUserServiceCreate {
  signupWithEmailInput: SignupWithEmailInput;
}

export interface IUserServiceFindOneByEmail {
  email: string;
}

export interface IUserServiceCreateWithGoogle {
  name: string;
  email: string;
}

export interface IUpdateUserCountryCode {
  countryCode: string;
  context: IContext;
}
