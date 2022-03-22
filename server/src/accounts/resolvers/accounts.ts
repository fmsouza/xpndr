import {
  Resolver,
  Query,
  Ctx,
  Authorized,
  InputType,
  Field,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql'
import Container, { Inject, Service } from 'typedi'
import EventEmitter from 'events'

import { Context } from '~/context'
import { User } from '~/users/types'
import { UsersService } from '~/users/services'
import { QUEUE_TOKEN } from '~/tokens'
import { QueueEvent, ResourceNotFoundError } from '~/shared/types'

import { AccountsService } from '../services'
import { Account, AccountType } from '../types'
import { AccountTypesService } from '../services'
import { AccountsEventListener } from '../listener'

Container.get(AccountsEventListener);

@InputType()
export class AccountCreateInput {
  @Field() title: string;
  @Field() accountTypeId: number;
}

@InputType()
export class AccountSyncInput {
  @Field() accountId: number;
}

@Service()
@Resolver(Account)
export class AccountsResolvers {
  public constructor(
    @Inject(QUEUE_TOKEN) private readonly queue: EventEmitter,
    private readonly accountTypesService: AccountTypesService,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
  ) {}

  @Authorized()
  @Query(() => [Account])
  async accounts(@Ctx() context: Context) {
    const { user } = context;
    return this.accountsService.getAccountsByUserId(user.id);
  }

  @Authorized()
  @Mutation((_returns) => Account)
  public async createAccount(
    @Ctx() { user }: Context,
    @Arg('input') input: AccountCreateInput,
  ): Promise<Account> {
    return this.accountsService.createAccount({
      ...input,
      user
    });
  }

  @Authorized()
  @Mutation((_returns) => Boolean)
  public async syncAccount(
    @Ctx() { user }: Context,
    @Arg('input') input: AccountSyncInput,
  ): Promise<boolean> {
    const { accountId } = input;
    const account: Account | null = await this.accountsService.getAccountById(accountId);
    if (!account) {
      throw new ResourceNotFoundError('This account does not exist.');
    }
    this.queue.emit(QueueEvent.ACCOUNT_SYNC, account);
    return true;
  }

  @Authorized()
  @FieldResolver(() => [AccountType])
  public async accountType(@Root() account: Account) {
    return this.accountTypesService.getAccountTypeById(account.accountTypeId)
  }

  @Authorized()
  @FieldResolver(() => [User])
  public async owner(@Root() account: Account) {
    return this.usersService.getUserById(account.ownerId);
  }
}
