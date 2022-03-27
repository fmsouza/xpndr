import { ResolverData } from "type-graphql";

import { AuthenticationRequiredError } from "~/shared/errors";

import { Context } from "./context";

export default async function({ context }: ResolverData<Context>, _roles: any[]): Promise<boolean> {
  const { user } = context ?? {};

  if (!user) {
    throw new AuthenticationRequiredError('Access Forbidden: You must authenticate first.');
  }

  return Boolean(user);
}
