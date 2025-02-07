import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';

import { router } from '@/shared/lib/tanstack-router';

export const RouterProvider = () => {
  return <TanstackRouterProvider router={router} />;
};
