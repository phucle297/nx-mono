import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import classes from './styles.module.css';
import { HeaderNavItem } from '../header-nav-item';
import { HeaderSearchBar } from '../header-search-bar';
import { Link } from '@tanstack/react-router';
import { HeaderMobileNav } from '../header-mobile-nav';
import clsx from 'clsx';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: 'Home', to: '#' },
    { name: 'Shop', to: '#' },
    { name: 'Categories', to: '#' },
    { name: 'Deals', to: '#' },
    { name: 'About', to: '#' },
  ];

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.navbar}>
          {/* Logo */}
          <div>
            <Link to="/" className={classes.logo}>
              Store
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={classes.nav}>
            {navItems.map((item) => (
              <HeaderNavItem key={item.name} {...item} />
            ))}
          </nav>

          {/* Actions */}
          <div className={classes.actions}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={classes.iconButton}
            >
              <Search size={24} />
            </button>

            <Link to="/" className={classes.iconButton}>
              <User size={24} />
            </Link>

            <Link
              to="/"
              className={classes.iconButton}
              style={{ position: 'relative' }}
            >
              <ShoppingCart size={24} />
              <span className={classes.cartBadge}>3</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              //className={`${classes.iconButton} ${classes.mobileMenuButton}`}
              className={clsx(
                classes['icon-button'],
                classes['mobile-menu-button']
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && <HeaderSearchBar />}

        {/* Mobile Navigation */}
        {isMenuOpen && <HeaderMobileNav items={navItems} />}
      </div>
    </header>
  );
};
