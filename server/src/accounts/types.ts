import { ObjectType, Field, ID } from 'type-graphql'

import { User } from '../users/types'

@ObjectType()
export class AccountType {
  @Field((type) => ID) id: number;
  @Field((type) => String) title: string;
  @Field((type) => Boolean) enabled: boolean;
}

@ObjectType()
export class Account {
  @Field((type) => ID) id: number;
  @Field((type) => String) title: string;
  @Field((type) => Date) createdAt: Date;
  @Field((type) => Date) updatedAt: Date;
  @Field((type) => Date, { nullable: true }) deletedAt?: Date | null;

  ownerId: number;
  @Field((type) => User) owner?: User;

  accountTypeId: number;
  @Field((type) => AccountType) accountType?: AccountType;
}
