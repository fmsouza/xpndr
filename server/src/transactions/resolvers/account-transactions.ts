import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  InputType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';
import { AccountsService } from '~/accounts/services';
import { Account } from '~/accounts/types';

import { AccountTransactionsService } from '../services';
import { AccountTransaction } from '../types';

@InputType()
export class AccountTransactionsInput {
  @Field() accountId: number;
}

@Service()
@Resolver(AccountTransaction)
export class AccountTransactionsResolvers {
  public constructor(
    private readonly accountTransactionsService: AccountTransactionsService,
    private readonly accountsService: AccountsService
  ) {}

  @Authorized()
  @Query(() => [AccountTransaction])
  public async accountTransactions(@Arg('input') input: AccountTransactionsInput) {
    const { accountId } = input;
    return this.accountTransactionsService.getTransactionsByAccountId(accountId);
  }

  @Authorized()
  @FieldResolver(() => [Account])
  public async account(@Root() transaction: AccountTransaction) {
    return this.accountsService.getAccountById(transaction.accountId);
  }
}
