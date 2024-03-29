import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import Container, { Inject, Service } from 'typedi';
import EventEmitter from 'events';

import { Context } from '~/context';
import { User } from '~/users/types';
import { UsersService } from '~/users/services';
import { QUEUE_TOKEN } from '~/tokens';
import { QueueEvent } from '~/shared/types';
import { ResourceNotFoundError } from "~/shared/errors";

import { AccountsService } from '../services';
import { Account, AccountType, AccountTypeItem } from '../types';
import { AccountsEventListener } from '../listener';

Container.get(AccountsEventListener);

@InputType()
export class AccountCreateInput {
  @Field((_type) => String) title: string;
  @Field((_type) => AccountType) accountType: AccountType;
}

@InputType()
export class AccountSyncInput {
  @Field((_type) => Number) accountId: number;
  @Field((_type) => String) pincode?: string;
}

@Service()
@Resolver(Account)
export class AccountsResolvers {
  public constructor(
    @Inject(QUEUE_TOKEN) private readonly queue: EventEmitter,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
  ) {}

  @Authorized()
  @Query((_returns) => [Account])
  public async accounts(@Ctx() context: Context) {
    const { user } = context;
    return this.accountsService.getAccountsByUserId(user.id);
  }

  @Authorized()
  @Query((_returns) => [AccountTypeItem])
  public async accountTypes() {
    return this.accountsService.getAccountTypes();
  }

  @Authorized()
  @Mutation((_returns) => Account)
  public async createAccount(
    @Ctx() { user }: Context,
    @Arg('input') input: AccountCreateInput,
  ) {
    return this.accountsService.createAccount({
      ...input,
      user
    });
  }

  @Authorized()
  @Mutation((_returns) => Boolean)
  public async syncAccount(
    @Arg('input') input: AccountSyncInput,
  ): Promise<boolean> {
    const { accountId, pincode } = input;
    const account = await this.accountsService.getAccountById(accountId);
    if (!account) {
      throw new ResourceNotFoundError('This account does not exist.');
    }
    this.queue.emit(QueueEvent.ACCOUNT_SYNC, {account, pincode});
    return true;
  }

  @Authorized()
  @FieldResolver((_returns) => [User])
  public async owner(@Root() account: Account) {
    return this.usersService.getUserById(account.ownerId);
  }
}
