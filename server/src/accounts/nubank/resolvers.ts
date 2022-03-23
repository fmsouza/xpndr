import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import Container, { Service } from 'typedi';

import { ResourceNotFoundError } from '~/shared/types';

import { AccountsService } from '../services';
import { Account } from '../types';
import { NubankEventListener } from './listener';
import { NubankService } from './service';

Container.get(NubankEventListener);

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
  @Field((_type) => String)
  sentTo: string;
}

@Service()
@Resolver(Account)
export class NubankResolvers {
  public constructor(
    private readonly nubankService: NubankService,
    private readonly accountsService: AccountsService
  ) { }

  @Authorized()
  @Mutation((_returns) => NubankLoginResponse)
  public async nubankAccountLogin(
    @Arg('input') input: NubankAuthenticationInput,
  ): Promise<NubankLoginResponse> {
    const sentTo: string = await this.nubankService.login(input);
    return { sentTo };
  }

  @Authorized()
  @Mutation((_returns) => Account)
  public async nubankVerifyAccount(
    @Arg('input') input: NubankAccountVerificationInput,
  ): Promise<Account> {
    const account = await this.accountsService.getAccountById(input.accountId);
    if (!account) {
      throw new ResourceNotFoundError('The account provided does not exist.');
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
