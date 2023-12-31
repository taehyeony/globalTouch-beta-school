import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CountryCode } from '../countryCode/entities/countryCode.entity';
import {
  IUserServiceCreate,
  IUserServiceCreateWithGoogle,
  IUserServiceEditProfile,
  IUserServiceFindOneByEmail,
  IUserServiceUpdateUserCountryCode,
} from './interfaces/user-service.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // temporarily, have to make seed file, put dummy data
    @InjectRepository(CountryCode)
    private readonly countryCodeRepository: Repository<CountryCode>,
  ) {}

  hello(): string {
    return 'hello2';
  }

  findOneByEmail({ email }: IUserServiceFindOneByEmail) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({ signupWithEmailInput }: IUserServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({
      email: signupWithEmailInput.email,
    });
    if (user) throw new ConflictException('Already registered email');

    const hashedPassword = await bcrypt.hash(signupWithEmailInput.password, 10);

    // temporarily, have to make seed file, put dummy data
    await this.countryCodeRepository.save({
      name: 'KR',
    });

    const foundCountryCode = await this.countryCodeRepository.findOne({
      where: { name: signupWithEmailInput.countryCode },
    });

    return this.userRepository.save({
      ...signupWithEmailInput,
      password_hash: hashedPassword,
      countryCode: foundCountryCode,
    });
  }

  async createWithGoogle({
    name,
    email,
  }: IUserServiceCreateWithGoogle): Promise<User> {
    return this.userRepository.save({
      name,
      email,
    });
  }

  async updateUserCountryCode({
    countryCode,
    context,
  }: IUserServiceUpdateUserCountryCode): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: context.req.user.user_id },
    });

    const newCountryCode = await this.countryCodeRepository.findOne({
      where: { name: countryCode },
    });

    return await this.userRepository.save({
      ...user,
      countryCode: newCountryCode,
    });
  }

  async editProfile({
    name,
    profile_image_url,
    context,
  }: IUserServiceEditProfile): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: context.req.user.user_id },
    });

    if (name) {
      user.name = name;
    }

    if (profile_image_url) {
      user.profile_image_url = profile_image_url;
    }

    return await this.userRepository.save({ ...user });
  }
}
