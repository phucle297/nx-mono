import { LoaderCircle } from 'lucide-react';
import styles from './layout.module.css';

export const PendingLayout = () => {
  return (
    <div className={styles['pending-layout']}>
      <LoaderCircle size="48" />
    </div>
  );
};
