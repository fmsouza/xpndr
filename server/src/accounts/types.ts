import { ObjectType, Field, ID } from 'type-graphql'

import { User } from '~/users/types'

@ObjectType()
export class AccountType {
  @Field((_type) => ID) id: number;
  @Field((_type) => String) title: string;
  @Field((_type) => Boolean) enabled: boolean;
}

@ObjectType()
export class Account {
  @Field((_type) => ID) id: number;
  @Field((_type) => String) title: string;
  @Field((_type) => Date) createdAt: Date;
  @Field((_type) => Date) updatedAt: Date;
  @Field((_type) => Date, { nullable: true }) deletedAt?: Date | null;

  ownerId: number;
  @Field((_type) => User) owner?: User;

  accountTypeId: number;
  @Field((_type) => AccountType) accountType?: AccountType;

  connectionDetails?: string | null;
}
