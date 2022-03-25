import { registerEnumType } from 'type-graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
registerEnumType(SortOrder, { name: 'SortOrder' });

export type Globals = {
  NODE_ENV: string,
  PORT: number,
  JWT_SECRET: string,
  JWT_ALGORITHM: string,
  JWT_EXPIRES_IN: string,
};

export enum QueueEvent {
  ACCOUNT_SYNC = 'account_sync',
  NUBANK_SYNC = 'nubank_sync'
}
