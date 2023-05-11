import { createHash } from 'crypto';
import AES from 'crypto-js/aes';
import { Container } from 'typedi';
import { SignOptions, sign, verify } from 'jsonwebtoken';

import { GLOBALS_TOKEN } from '~/tokens';

import { Globals } from './types';

export function sha256(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function encrypt<T>(input: {contents: T, privateKey: string}): string {
  const { contents, privateKey } = input;
  return AES.encrypt(JSON.stringify(contents), privateKey).toString();
}

export function decrypt<T>(input: {contents: string, privateKey: string}): T {
  const { contents, privateKey } = input;
  return JSON.parse(AES.decrypt(contents, privateKey).toString());
}

export function createJwt<T>(contents: T): string {
  const { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRES_IN } = Container.get<Globals>(GLOBALS_TOKEN);
  return sign({ contents }, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

export function decodeJwt<T>(token: string): T | null {
  try {
    const { JWT_SECRET } = Container.get<Globals>(GLOBALS_TOKEN);
    return verify(token, JWT_SECRET) as T;
  } catch (_e) {
    return null;
  }
}
