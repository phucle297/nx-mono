import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export function useBackToTop(): void {
  const router = useRouter();

  const unsubscribe = router.subscribe('onLoad', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [unsubscribe]);
}
