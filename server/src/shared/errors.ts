import { ApolloError } from 'apollo-server';

export class AuthenticationRequiredError extends ApolloError {
  public constructor(message: string) {
    super(message, 'AUTHENTICATION_REQUIRED');
    Object.defineProperty(this, 'name', { value: 'AuthenticationRequiredError' });
  }
}

export class ResourceNotFoundError extends ApolloError {
  public constructor(message: string) {
    super(message, 'RESOURCE_NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'ResourceNotFoundError' });
  }
}
