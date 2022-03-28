import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';

import { User } from '~/users/types';

@ObjectType()
export class Account {
  @Field((_type) => ID) id: number;
  @Field((_type) => String) title: string;
  @Field((_type) => Date) createdAt: Date;
  @Field((_type) => Date) updatedAt: Date;
  @Field((_type) => Date, { nullable: true }) deletedAt?: Date | null;
  @Field((_type) => AccountType) accountType: AccountType;

  ownerId: number;
  @Field((_type) => User) owner?: User;

  connectionDetails?: string | null;
}

@ObjectType()
export class AccountTypeItem {
  @Field((_type) => AccountType) accountType: AccountType;
  @Field((_type) => String) label: string;
}

export enum AccountType {
  NUBANK = 'nubank'
}
registerEnumType(AccountType, { name: 'AccountType' });