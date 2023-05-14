import { Service } from "typedi";
import cache from 'memory-cache';
import {AccountTransaction, CardTransaction, NubankApi} from 'nubank-api';
import { AuthState } from "nubank-api/lib/utils/http";

import { decrypt, sha256 } from "~/shared/utils";

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

  public async verifyAccount(input: {accountId: number, cpf: string, password: string, deviceId: string, authCode: string}): Promise<{cert: Buffer, certCrypto: Buffer, authState: AuthState}> {
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

  public async getCreditCardTransactions(input: {account: Account, pincode: string}): Promise<CardTransaction[]> {
    const { account, pincode } = input;
    if (!account.connectionDetails) {
      throw new CredentialsNotFoundError(`[account:${account.id}] The credentials to access this account are not set.`);
    }

    const decryptedCreds = decrypt<string>({
      contents: account.connectionDetails,
      privateKey: pincode
    });
    
    const credentials: {cert: string, certCrypto: string, authState: AuthState} = JSON.parse(decryptedCreds);

    const api: NubankApi = new NubankApi({
      ...credentials.authState,
      cert: Buffer.from(credentials.cert, 'hex')
    });
    return api.card.getTransactions();
  }

  public async getAccountTransactions(input: {account: Account, pincode: string}): Promise<AccountTransaction[]> {
    const { account, pincode } = input;
    if (!account.connectionDetails) {
      throw new CredentialsNotFoundError(`[account:${account.id}] The credentials to access this account are not set.`);
    }

    const decryptedCreds = decrypt<string>({
      contents: account.connectionDetails,
      privateKey: pincode
    });
    
    const credentials: {cert: string, certCrypto: string, authState: AuthState} = JSON.parse(decryptedCreds);

    const api: NubankApi = new NubankApi({
      ...credentials.authState,
      cert: Buffer.from(credentials.cert, 'hex')
    });
    return api.account.getTransactions();
  }
}