import cx from 'clsx';

import { useCarousel } from '../carousel.hook';

import classes from './styles.module.css';
import { ChevronRightIcon } from 'lucide-react';
import { ButtonHTMLAttributes, MouseEvent } from 'react';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const CarouselNextButton = ({
  className,
  children,
  onClick,
  ...buttonProps
}: TButtonProps) => {
  const { canScrollNext, scrollNext } = useCarousel();
  const onClickNext = (event: MouseEvent<HTMLButtonElement>) => {
    scrollNext();
    onClick?.(event);
  };

  return (
    <button
      type="button"
      aria-label="Next slide"
      aria-disabled={!canScrollNext}
      disabled={!canScrollNext}
      className={cx(classes['carousel-prev-btn'], className)}
      onClick={onClickNext}
      {...buttonProps}
      data-testid="carousel-next-btn"
    >
      {children ? (
        children
      ) : (
        <ChevronRightIcon
          className={classes['next-icon']}
          data-testid="next-icon"
        />
      )}
    </button>
  );
};

CarouselNextButton.displayName = 'Carousel.NextButton';

export { CarouselNextButton };
