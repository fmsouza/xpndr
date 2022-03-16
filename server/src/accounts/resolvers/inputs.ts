import {
  InputType,
  Field,
} from 'type-graphql'

@InputType()
export class AccountCreateInput {
  @Field() title: string;
  @Field() accountTypeId: number;
}
