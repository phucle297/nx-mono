import type useEmblaCarousel from 'embla-carousel-react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';

export type CarouselRef = UseEmblaCarouselType[0];
export type CarouselApi = UseEmblaCarouselType[1];
export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

export type CarouselStylesProps = {
  options: CarouselOptions;
  plugins: CarouselPlugin;
  setApi: (api: CarouselApi) => void;
  onSelectCallback: (index: number) => void;
};

export type EmblaCarouselType = NonNullable<CarouselApi>;

export type UseDotIndicatorButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};
