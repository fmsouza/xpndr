import { createHash } from 'crypto';
import { Container } from 'typedi'
import { sign, SignOptions } from 'jsonwebtoken';
import { Globals } from './types';

export function sha256(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function createJwt<T>(contents: T): string {
  const { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRES_IN } = Container.get<Globals>('GLOBALS');
  return sign({ contents }, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRES_IN } as SignOptions);
}
