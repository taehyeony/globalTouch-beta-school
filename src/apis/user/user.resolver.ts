import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignupWithEmailInput } from './dto/signupWithEmail.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return this.userService.hello();
  }

  @Mutation(() => User)
  async signupWithEmail(
    @Args('signupWithEmailInput') signupWithEmailInput: SignupWithEmailInput,
  ): Promise<User> {
    return this.userService.create({ signupWithEmailInput });
  }
}
