import { router } from '@ec-client/shared/lib/tanstack-router'
import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router'

export const RouterProvider = () => {
  return <TanstackRouterProvider router={router} />
}
