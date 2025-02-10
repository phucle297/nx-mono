import { IAdvertising } from '../../types';
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNextButton,
  CarouselPrevButton,
} from '@/shared/ui/embla-carousel';
import classes from './styles.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import clsx from 'clsx';

type TAdsCarouselProps = {
  ads: IAdvertising[];
};

export const AdsCarousel = ({ ads }: TAdsCarouselProps) => {
  return (
    <Carousel
      options={{
        loop: true,
      }}
    >
      <CarouselContent contentClassName={classes['content']}>
        {ads.map((ad) => (
          <CarouselItem key={ad.id} className={classes['item']}>
            <img src={ad.image} alt={ad.title} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControls className={classes.controls}>
        <CarouselPrevButton className={clsx(classes.btn, classes['prev-btn'])}>
          <ChevronLeftIcon />
        </CarouselPrevButton>
        <CarouselNextButton className={clsx(classes.btn, classes['next-btn'])}>
          <ChevronRightIcon />
        </CarouselNextButton>
      </CarouselControls>
    </Carousel>
  );
};
