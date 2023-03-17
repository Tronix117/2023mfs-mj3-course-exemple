import type { AppRouter } from '@mfs2023/com-trpc-server';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();
