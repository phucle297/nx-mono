import { Link } from '@tanstack/react-router';
import classes from './styles.module.css';
import { ReactNode } from 'react';

type THeaderNavItemProps = {
  name: string;
  to: string;
  icon?: ReactNode;
};

export const HeaderNavItem = ({ name, to, icon }: THeaderNavItemProps) => (
  <Link to={to} className={classes['nav-item']}>
    {icon}
    {name}
  </Link>
);
