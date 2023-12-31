import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupWithEmailInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  countryCode: string;
}
