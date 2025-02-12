import { TanStackRouterDevtools } from '@ec-client/shared/lib/tanstack-router'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
})
