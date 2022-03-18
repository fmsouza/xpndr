import { ObjectType, Field, ID } from 'type-graphql'

import { Account } from '~/accounts/types'

@ObjectType()
export class AccountTransaction {
  @Field((type) => ID) id: number
  @Field((type) => String) externalId: string
  @Field((type) => Number) amount: number
  @Field((type) => String) details: string
  @Field((type) => String) origin: string
  @Field((type) => String) destination: string
  @Field((type) => Date) createdAt: Date
  @Field((type) => Date) updatedAt: Date
  @Field((type) => Date) deletedAt?: Date | null

  accountId: number;
  @Field((type) => Account) account: Account

  categoryId: number;
  // @Field((type) => Category) category: Category
}

@ObjectType()
export class CreditCardTransaction {
  @Field((type) => ID) id: number
  @Field((type) => String) externalId: string
  @Field((type) => Number) amount: number
  @Field((type) => String) title: string
  @Field((type) => String) details: string
  @Field((type) => Date) createdAt: Date
  @Field((type) => Date) updatedAt: Date
  @Field((type) => Date) deletedAt?: Date | null

  accountId: number;
  @Field((type) => Account) account: Account

  categoryId: number;
  // @Field((type) => Category) category: Category
}
