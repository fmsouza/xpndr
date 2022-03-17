import {resolvers as mainResolvers} from './resolvers';
import * as nubankResolvers from './nubank/resolvers';

export const resolvers = [
  ...mainResolvers,
  ...Object.values(nubankResolvers),
];
