import cx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import {
  type ComponentProps,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CarouselProvider } from '../carousel.context';
import type { CarouselApi, CarouselStylesProps } from '../carousel.type';

import classes from './styles.module.css';

type TCarouselProps = ComponentProps<'div'> & Partial<CarouselStylesProps>;

const Carousel = ({
  options,
  plugins = [],
  className,
  setApi,
  children,
  onSelectCallback,
  ...divProps
}: TCarouselProps) => {
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...options,
    },
    plugins
  );

  const onSelect = useCallback(
    (api: CarouselApi) => {
      if (!api) return;
      //* Get the selected index from Embla Carousel
      const currentIndex = api.selectedScrollSnap();

      // onScrollSnapsChange(api.scrollSnapList());

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      onSelectCallback?.(currentIndex);
    },
    [onSelectCallback]
  );

  useEffect(() => {
    if (!api || !setApi) return;

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    onSelect(api);

    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('resize', onSelect);
    };
  }, [api, onSelect]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollNext, scrollPrev]
  );

  const contextValue = {
    options,
    plugins,
    api,
    canScrollPrev,
    canScrollNext,
    carouselRef,
    setApi,
    scrollPrev,
    scrollNext,
  };

  return (
    <CarouselProvider value={contextValue}>
      <div
        aria-label="Carousel"
        aria-roledescription="carousel"
        className={cx(classes.carousel, className)}
        onKeyDownCapture={handleKeyDown}
        {...divProps}
      >
        {children}
      </div>
    </CarouselProvider>
  );
};

Carousel.displayName = 'Carousel.Root';

export { Carousel };
