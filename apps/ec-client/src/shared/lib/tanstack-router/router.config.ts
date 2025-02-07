import { createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { queryClient } from '../tanstack-query';
import { routeTree } from '@/routeTree.gen';

// Create a new router instance
export const router = createRouter({
  routeTree,
  notFoundMode: 'fuzzy',
  context: {
    queryClient,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
