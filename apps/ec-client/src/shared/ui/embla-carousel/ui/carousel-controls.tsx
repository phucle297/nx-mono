import cx from 'clsx';
import type { ComponentProps } from 'react';

import classes from './styles.module.css';

type TCarouselControlsProps = ComponentProps<'div'>;

const CarouselControls = ({
  className,
  children,
  ...divProps
}: TCarouselControlsProps) => {
  return (
    <div className={cx(classes.controls, className)} {...divProps}>
      {children}
    </div>
  );
};

CarouselControls.displayName = 'Carousel.Controls';

export { CarouselControls };
