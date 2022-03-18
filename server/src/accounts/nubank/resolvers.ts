import {
  Resolver,
  Authorized,
  InputType,
  Field,
  Mutation,
  Arg,
  ObjectType,
} from 'type-graphql'
import { Service } from 'typedi'

import { ResourceNotFoundError } from '~/shared/types';

import { AccountsService } from '../services';
import { Account } from '../types'
import { NubankService } from './service';

@InputType()
export class NubankAuthenticationInput {
  @Field() accountId: number;
  @Field() cpf: string;
  @Field() password: string;
  @Field() deviceId: string;
}

@InputType()
export class NubankAccountVerificationInput {
  @Field() accountId: number;
  @Field() cpf: string;
  @Field() password: string;
  @Field() deviceId: string;
  @Field() authCode: string;
}

@ObjectType()
export class NubankLoginResponse {
  @Field((type) => String)
  sentTo: string
}

@Service()
@Resolver(Account)
export class NubankResolvers {
  public constructor(
    private readonly nubankService: NubankService,
    private readonly accountsService: AccountsService,
  ) { }

  @Authorized()
  @Mutation((returns) => NubankLoginResponse)
  public async nubankAccountLogin(
    @Arg('input') input: NubankAuthenticationInput,
  ): Promise<NubankLoginResponse> {
    const sentTo: string = await this.nubankService.login(input);
    return { sentTo };
  }

  @Authorized()
  @Mutation((returns) => Account)
  public async nubankVerifyAccount(
    @Arg('input') input: NubankAccountVerificationInput,
  ): Promise<Account> {
    const account = await this.accountsService.getAccountById(input.accountId);
    if (!account) {
      throw new ResourceNotFoundError('The account provided does not exist.')
    }
    const { cert, certCrypto, authState } = await this.nubankService.verifyAccount(input);
    account.connectionDetails = JSON.stringify({
      cert: cert.toString('hex'),
      certCrypto: certCrypto.toString('hex'),
      authState
    });
    return this.accountsService.updateAccount(account);
  }
}
