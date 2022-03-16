import {
  InputType,
  Field,
} from 'type-graphql'

@InputType()
export class UserCreateInput {
  @Field() email: string;
  @Field() name: string;
  @Field() password: string;
}

@InputType()
export class UserLoginInput {
  @Field() email: string;
  @Field() password: string;
}
