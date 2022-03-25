import { Container } from 'typedi';
import { PrismaClient } from '@prisma/client';
import EventEmitter from 'events';

import * as Token from './tokens';
import { Globals } from './shared/types';

const GLOBAL_CONSTANTS: Globals = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT) ?? 4000,
  JWT_SECRET: process.env.JWT_SECRET ?? 'shhhhhhhh',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM ?? 'HS256',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
};

Container.set({ id: Token.PRISMA_TOKEN, factory: () => new PrismaClient() });
Container.set({ id: Token.GLOBALS_TOKEN, value: GLOBAL_CONSTANTS });
Container.set({ id: Token.QUEUE_TOKEN, value: new EventEmitter(), eager: true });