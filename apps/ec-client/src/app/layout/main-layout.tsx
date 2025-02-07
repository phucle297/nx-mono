import { Outlet } from '@tanstack/react-router';

import { Footer } from '@/shared/ui/footer';
import { Header } from '@/shared/ui/header';

import { useBackToTop } from './layout.hook';

import styles from './layout.module.css';

export const MainLayout = () => {
  useBackToTop();

  return (
    <>
      <Header />
      <div className={styles['main-layout']}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
