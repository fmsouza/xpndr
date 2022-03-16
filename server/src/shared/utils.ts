import { createHash } from 'crypto';
import { Container } from 'typedi'
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { Globals } from './types';
import { InjectionToken } from '../setup';

export function sha256(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function createJwt<T>(contents: T): string {
  const { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRES_IN } = Container.get<Globals>(InjectionToken.GLOBALS);
  return sign({ contents }, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

export function decodeJwt<T>(token: string): T | null {
  try {
    const { JWT_SECRET } = Container.get<Globals>(InjectionToken.GLOBALS);
    return verify(token, JWT_SECRET) as T;
  } catch (_e) {
    return null;
  }
}
