import { QueryClient } from '@tanstack/react-query';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const RETRY_COUNT = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: RETRY_COUNT,
      retryDelay: SECOND,
      staleTime: MINUTE * 5,
      // Enable this option when we have a global error boundary.
      // throwOnError: true,
    },
  },
});
