import { initTRPC } from '@trpc/server';
import z from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.query((req) => 'Hello World !'),
  sayHello: t.procedure
    .input(
      z.object({
        firstname: z.string().nullish(),
      }),
    )
    .query(({ input }) => `Hello ${input.firstname} !`),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
