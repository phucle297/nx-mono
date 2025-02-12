import { Outlet } from '@tanstack/react-router'

import { Footer } from '@ec-client/shared/ui/footer'

import { useBackToTop } from './layout.hook'

import styles from './layout.module.css'
import { Header } from '@ec-client/shared/ui/header'

export const MainLayout = () => {
  useBackToTop()

  return (
    <>
      <Header />
      <div className={styles['main-layout']}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
