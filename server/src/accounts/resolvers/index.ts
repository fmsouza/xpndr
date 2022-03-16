import * as accountTypesResolvers from './account-types';
import * as accountResolvers from './accounts';

export const resolvers = [
  ...Object.values(accountResolvers),
  ...Object.values(accountTypesResolvers),
];
