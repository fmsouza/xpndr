import { DateTimeResolver } from 'graphql-scalars';
import { GraphQLScalarType } from 'graphql';

export const scalars = [
  { type: GraphQLScalarType, scalar: DateTimeResolver }
];