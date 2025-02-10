import cx from 'clsx';
import type { ComponentProps } from 'react';

import { useCarousel } from '../carousel.hook';

import classes from './styles.module.css';

type TCarouselContentProps = ComponentProps<'ul'> & {
  contentClassName?: ComponentProps<'div'>['className'];
};

const CarouselContent = ({
  className,
  contentClassName,
  children,
  ...ulProps
}: TCarouselContentProps) => {
  const { carouselRef } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cx(classes['carousel-content'], contentClassName)}
    >
      <ul className={cx(classes['carousel-list'], className)} {...ulProps}>
        {children}
      </ul>
    </div>
  );
};

CarouselContent.displayName = 'Carousel.Content';

export { CarouselContent };
