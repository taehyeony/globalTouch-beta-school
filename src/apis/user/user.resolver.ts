import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignupWithEmailInput } from './dto/signupWithEmail.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchMyProfile(@Context() context: IContext): string {
    console.log('======');
    console.log(context.req.user);
    console.log('======');
    return 'authorization success';
  }

  @Mutation(() => User)
  async signupWithEmail(
    @Args('signupWithEmailInput') signupWithEmailInput: SignupWithEmailInput,
  ): Promise<User> {
    return this.userService.create({ signupWithEmailInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  async updateUserCountryCode(
    @Args('coutryCode') countryCode: string,
    @Context() context: IContext,
  ): Promise<User> {
    return this.userService.updateUserCountryCode({ countryCode, context });
  }
}
