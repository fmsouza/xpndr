import { Container } from 'typedi'
import { PrismaClient } from '@prisma/client'

import { Globals } from './shared/types';

const GLOBAL_CONSTANTS: Globals = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'j34sskj3jl',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM ?? 'HS256',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
}

Container.set({ id: 'PRISMA', factory: () => new PrismaClient() });
Container.set({ id: 'GLOBALS', value: GLOBAL_CONSTANTS });