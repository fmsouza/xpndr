import * as inputs from './inputs';
import { MutationsResolver } from './mutations';
import { QueriesResolver } from './queries';

export * from './inputs';

export const resolvers = [
  QueriesResolver,
  MutationsResolver,
  ...Object.values(inputs),
];
