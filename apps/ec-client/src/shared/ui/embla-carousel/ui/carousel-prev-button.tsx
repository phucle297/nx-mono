import cx from 'clsx';

import { useCarousel } from '../carousel.hook';

import classes from './styles.module.css';
import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { ChevronLeftIcon } from 'lucide-react';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const CarouselPrevButton = ({
  className,
  children,
  onClick,
  ...buttonProps
}: TButtonProps) => {
  const { canScrollPrev, scrollPrev } = useCarousel();
  const onClickPrev = (event: MouseEvent<HTMLButtonElement>) => {
    scrollPrev();
    onClick?.(event);
  };

  return (
    <button
      type="button"
      aria-label="Previous slide"
      aria-disabled={!canScrollPrev}
      disabled={!canScrollPrev}
      className={cx(classes['carousel-prev-btn'], className)}
      onClick={onClickPrev}
      {...buttonProps}
      data-testid="carousel-prev-btn"
    >
      {children ? (
        children
      ) : (
        <ChevronLeftIcon
          className={classes['prev-icon']}
          data-testid="prev-icon"
        />
      )}
    </button>
  );
};
CarouselPrevButton.displayName = 'Carousel.PrevButton';

export { CarouselPrevButton };
