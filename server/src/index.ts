import 'reflect-metadata';
import { Container } from 'typedi';

import './setup';

import { GLOBALS_TOKEN } from './tokens';
import { Globals } from './shared/types';
import { createServer } from './server';

(async () => {
  const globals: Globals = Container.get(GLOBALS_TOKEN);
  const server = await createServer();
  
  server.listen({ port: globals.PORT }, () => {

    console.log(`🚀 Server ready at: http://localhost:4000`);
  });
})();
