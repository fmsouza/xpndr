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

export class ResourceNotFoundError extends ApolloError {
  public constructor(message: string) {
    super(message, 'RESOURCE_NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'ResourceNotFoundError' });
  }
}