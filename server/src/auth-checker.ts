import { ResolverData } from "type-graphql";

import { Context } from "./context";

export default async function({ context }: ResolverData<Context>, _roles: any[]): Promise<boolean> {
  const { user } = context ?? {};

  return Boolean(user);
}
