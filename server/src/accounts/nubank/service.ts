import { Service } from "typedi";
import cache from 'memory-cache';
import {NubankApi} from 'nubank-api';

import { sha256 } from "~/shared/utils";

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
}