import { ApolloError } from 'apollo-server';
import { registerEnumType } from 'type-graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
registerEnumType(SortOrder, { name: 'SortOrder' });

export type Globals = {
  JWT_SECRET: string
  JWT_ALGORITHM: string
  JWT_EXPIRES_IN: string
};

export enum QueueEvent {
  ACCOUNT_SYNC = 'account_sync',
  NUBANK_SYNC = 'nubank_sync'
}

export class ResourceNotFoundError extends ApolloError {
  public constructor(message: string) {
    super(message, 'RESOURCE_NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'ResourceNotFoundError' });
  }
}