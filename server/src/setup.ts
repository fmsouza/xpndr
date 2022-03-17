import { Container } from 'typedi'
import { PrismaClient } from '@prisma/client'

import * as Token from './tokens';
import { Globals } from './shared/types';

const GLOBAL_CONSTANTS: Globals = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'j34sskj3jl',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM ?? 'HS256',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
}


Container.set({ id: Token.PRISMA_TOKEN, factory: () => new PrismaClient() });
Container.set({ id: Token.GLOBALS_TOKEN, value: GLOBAL_CONSTANTS });