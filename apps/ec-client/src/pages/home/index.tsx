import { IAdvertising } from '@/features/advertising';
import { AdsCarousel } from '@/features/advertising/ui/ads-carousel';

export const HomePage = () => {
  // data from loader
  const ads: IAdvertising[] = [
    {
      id: 1,
      title: 'Ad 1',
      image: 'https://picsum.photos/seed/1/1000/500',
      description: 'This is an ad',
      url: '/ad1',
      external: false,
    },
    {
      id: 2,
      title: 'Ad 2',
      image: 'https://picsum.photos/seed/2/1000/500',
      description: 'This is an ad',
      url: 'https://example.com',
      external: true,
    },
    {
      id: 3,
      title: 'Ad 3',
      image: 'https://picsum.photos/seed/3/1000/500',
      description: 'This is an ad',
      url: '/ad3',
      external: false,
    },
    {
      id: 3,
      title: 'Ad 4',
      image: 'https://picsum.photos/seed/4/1000/500',
      description: 'This is an ad',
      url: '/ad4',
      external: false,
    },
  ];

  return (
    <div>
      <AdsCarousel ads={ads} />
      <h1>Home</h1>
    </div>
  );
};
