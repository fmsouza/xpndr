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

import { CreditCardTransactionsService } from '../services';
import { CreditCardTransaction } from '../types';

@InputType()
export class CreditCardTransactionsInput {
  @Field() accountId: number;
}

@Service()
@Resolver(CreditCardTransaction)
export class CreditCardTransactionsResolvers {
  public constructor(
    private readonly creditCardTransactionsService: CreditCardTransactionsService,
    private readonly accountsService: AccountsService
  ) {}

  @Authorized()
  @Query(() => [CreditCardTransaction])
  public async creditCardTransactions(@Arg('input') input: CreditCardTransactionsInput) {
    const { accountId } = input;
    return this.creditCardTransactionsService.getTransactionsByAccountId(accountId);
  }

  @Authorized()
  @FieldResolver(() => [Account])
  public async account(@Root() transaction: CreditCardTransaction) {
    return this.accountsService.getAccountById(transaction.accountId);
  }
}
