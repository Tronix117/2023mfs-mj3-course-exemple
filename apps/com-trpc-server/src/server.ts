import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { appRouter } from './trpc.js';
createHTTPServer({
  router: appRouter,
}).listen(2022);
