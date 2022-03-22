import { ApolloError } from 'apollo-server'

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

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