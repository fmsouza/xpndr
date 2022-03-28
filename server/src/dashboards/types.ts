import { Field, InputType, ObjectType } from 'type-graphql';

import { Account } from '~/accounts/types';
import { ExpenseCategory } from '~/transactions/types';

@InputType()
export class AccountDashboardFiltersInput {
  @Field((_type) => Number) accountId: number;
  @Field((_type) => Date) startDate: Date;
  @Field((_type) => Date) endDate: Date;
}

@InputType()
export class AccountDashboardInput {
  @Field((_type) => AccountDashboardFiltersInput) filters: AccountDashboardFiltersInput;
}

@ObjectType()
export class CreditDashboard {
  @Field((_type) => [ExpenseCategory]) expensesByCategory: ExpenseCategory[];
}

@ObjectType()
export class AccountDashboard {
  @Field((_type) => Account) account: Account;
  @Field((_type) => CreditDashboard) credit: CreditDashboard;
}
