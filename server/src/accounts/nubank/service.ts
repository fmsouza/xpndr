import { Service } from "typedi";
import cache from 'memory-cache';
import {AccountTransaction, CardTransaction, NubankApi} from 'nubank-api';

import { sha256 } from "~/shared/utils";

import { Account } from "../types";
import { CredentialsNotFoundError } from "../errors";

const EXPIRES_IN_TEN_MINUTES = 600_000;

@Service()
export class NubankService {

  public async login(input: {accountId: number, cpf: string, password: string, deviceId: string}): Promise<string> {
    const { accountId, cpf, password, deviceId } = input;
    const cacheKey: string = sha256(`${accountId}:${cpf}:${password}`);

    const api = new NubankApi({
      clientName: 'xpndr-app'
    });

    const sentTo = await api.auth.requestAuthenticationCode({
      cpf,
      password,
      deviceId
    });

    cache.put(cacheKey, api, EXPIRES_IN_TEN_MINUTES);
    return sentTo;
  }

  public async verifyAccount(input: {accountId: number, cpf: string, password: string, deviceId: string, authCode: string}) {
    const { accountId, cpf, password, deviceId, authCode } = input;
    const cacheKey: string = sha256(`${accountId}:${cpf}:${password}`);
    const api: NubankApi = cache.get(cacheKey);
    const certificates = await api.auth.exchangeCertificates({
      cpf,
      password,
      deviceId,
      authCode
    });
    
    cache.del(cacheKey);

    await api.auth.authenticateWithCertificate(cpf, password, certificates.cert);

    return {
      ...certificates,
      authState: api.authState
    };
  }

  public async getCreditCardTransactions(account: Account): Promise<CardTransaction[]> {
    if (!account.connectionDetails) {
      throw new CredentialsNotFoundError(`[account:${account.id}] The credentials to access this account are not set.`);
    }
    const { cert, ...credentials } = JSON.parse(account.connectionDetails);
    const api: NubankApi = new NubankApi({
      ...credentials.authState,
      cert: Buffer.from(cert, 'hex')
    });
    return api.card.getTransactions();
  }

  public async getAccountTransactions(account: Account): Promise<AccountTransaction[]> {
    if (!account.connectionDetails) {
      throw new CredentialsNotFoundError(`[account:${account.id}] The credentials to access this account are not set.`);
    }
    const { cert, ...credentials } = JSON.parse(account.connectionDetails);
    const api: NubankApi = new NubankApi({
      ...credentials.authState,
      cert: Buffer.from(cert, 'hex')
    });
    return api.account.getTransactions();
  }
}