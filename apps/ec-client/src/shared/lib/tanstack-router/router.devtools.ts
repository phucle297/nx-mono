import { lazy } from 'react';

export const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'live'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );
