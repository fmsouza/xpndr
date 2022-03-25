import { ApolloError } from 'apollo-server';

export class ResourceNotFoundError extends ApolloError {
  public constructor(message: string) {
    super(message, 'RESOURCE_NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'ResourceNotFoundError' });
  }
}
