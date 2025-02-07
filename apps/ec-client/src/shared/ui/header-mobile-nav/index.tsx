import { Link } from '@tanstack/react-router';
import classes from './style.module.css';

type TMobileNavItemProps = {
  items: { name: string; to: string }[];
};

export const HeaderMobileNav = ({ items }: TMobileNavItemProps) => (
  <nav className={classes['mobile-nav']}>
    {items.map((item) => (
      <Link key={item.name} to={item.to} className={classes['mobile-nav-item']}>
        {item.name}
      </Link>
    ))}
  </nav>
);
