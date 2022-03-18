import { ObjectType, Field, ID } from 'type-graphql'

import { Account } from '~/accounts/types'

@ObjectType()
export class AccountTransaction {
  @Field((_type) => ID) id: number
  @Field((_type) => String) externalId: string
  @Field((_type) => Number) amount: number
  @Field((_type) => String) details: string
  @Field((_type) => String) origin: string
  @Field((_type) => String) destination: string
  @Field((_type) => Date) createdAt: Date
  @Field((_type) => Date) updatedAt: Date
  @Field((_type) => Date) deletedAt?: Date | null

  accountId: number;
  @Field((_type) => Account) account: Account

  categoryId: number;
  // @Field((_type) => Category) category: Category
}

@ObjectType()
export class CreditCardTransaction {
  @Field((_type) => ID) id: number
  @Field((_type) => String) externalId: string
  @Field((_type) => Number) amount: number
  @Field((_type) => String) title: string
  @Field((_type) => String) details: string
  @Field((_type) => Date) createdAt: Date
  @Field((_type) => Date) updatedAt: Date
  @Field((_type) => Date) deletedAt?: Date | null

  accountId: number;
  @Field((_type) => Account) account: Account

  categoryId: number;
  // @Field((_type) => Category) category: Category
}
