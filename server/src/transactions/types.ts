import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'

import { Account } from '~/accounts/types'

@ObjectType()
export class AccountTransaction {
  @Field((_type) => ID) id: number
  @Field((_type) => String) externalId: string
  @Field((_type) => String) title: string
  @Field((_type) => Number) amount: number
  @Field((_type) => AccountEventType) type: AccountEventType
  @Field((_type) => TransactionMovement) movement: TransactionMovement
  @Field((_type) => Date) createdAt: Date

  accountId: number;
  @Field((_type) => Account) account: Account
}

@ObjectType()
export class CreditCardTransaction {
  @Field((_type) => ID) id: number
  @Field((_type) => String) externalId: string
  @Field((_type) => Number) amount: number
  @Field((_type) => Number, { nullable: true }) installments?: number | null
  @Field((_type) => String) title: string
  @Field((_type) => Category) category: Category
  @Field((_type) => Boolean) isForeign: boolean
  @Field((_type) => Boolean) online: boolean
  @Field((_type) => Date) createdAt: Date

  accountId: number;
  @Field((_type) => Account) account: Account
}

export enum Category {
  CLOTHING = 'clothing',
  EDUCATION = 'education',
  ELECTRONICS = 'electronics',
  GROCERIES = 'groceries',
  HEALTH = 'health',
  HOME = 'home',
  LEISURE = 'leisure',
  OTHERS = 'others',
  RESTAURANT = 'restaurant',
  SERVICES = 'services',
  TRANSPORTATION = 'transportation',
  TRAVEL = 'travel',
}
registerEnumType(Category, { name: 'Category' });

export enum AccountEventType {
  BARCODE_PAYMENT = 'barcode_payment',
  DEBIT_PURCHASE = 'debit_purchase',
  TRANSFER_RECEIVED = 'transfer_received',
  BILL_PAYMENT = 'bill_payment',
  DEBIT_REVERSAL = 'debit_reversal',
  TRANSFER_SENT = 'transfer_sent',
  WITHDRAWAL = 'withdrawal',
  TRANSFER_SENT_REVERSAL = 'transfer_sent',
  OTHERS = 'others'
}
registerEnumType(AccountEventType, { name: 'AccountEventType' });

export enum TransactionMovement {
  IN = 'in',
  OUT = 'out',
}
registerEnumType(TransactionMovement, { name: 'TransactionMovement' });
