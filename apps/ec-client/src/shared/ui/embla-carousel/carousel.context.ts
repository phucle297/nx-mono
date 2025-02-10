import { createContext } from 'react';

import type {
  CarouselApi,
  CarouselRef,
  CarouselStylesProps,
} from './carousel.type';

type CarouselContextProps = Partial<CarouselStylesProps> & {
  carouselRef: CarouselRef;
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: VoidFunction;
  scrollNext: VoidFunction;
};

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export const CarouselProvider = CarouselContext.Provider;
