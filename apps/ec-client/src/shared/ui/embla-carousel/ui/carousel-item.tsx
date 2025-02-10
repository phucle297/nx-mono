import cx from 'clsx';
import type { ComponentProps } from 'react';

import classes from './styles.module.css';

type TCarouselItemProps = ComponentProps<'li'>;

const CarouselItem = ({
  className,
  children,
  ...liProps
}: TCarouselItemProps) => {
  return (
    <li
      role="group"
      aria-roledescription="Slide"
      className={cx(classes['carousel-item'], className)}
      {...liProps}
    >
      {children}
    </li>
  );
};

CarouselItem.displayName = 'Carousel.Item';

export { CarouselItem };
