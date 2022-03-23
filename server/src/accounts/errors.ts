import { ApolloError } from "apollo-server";

export class CredentialsNotFoundError extends ApolloError {
  public constructor(message: string) {
    super(message, 'CREDENTIALS_NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'CredentialsNotFoundError' });
  }
}