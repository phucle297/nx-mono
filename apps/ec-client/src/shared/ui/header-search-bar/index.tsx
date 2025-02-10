import { Search } from 'lucide-react';
import classes from './styles.module.css';

export const HeaderSearchBar = () => (
  <div className={classes['search-bar-wrapper']}>
    <div className={classes['search-bar']}>
      <input
        type="text"
        placeholder="Search products..."
        className={classes['search-input']}
      />
      <Search className={classes['search-icon']} size={20} />
    </div>
  </div>
);
