import { IAdvertising } from '@ec-client/features/advertising'
import { AdsCarousel } from '@ec-client/features/advertising/ui/ads-carousel'
import { useCreateProduct } from '@ec-client/features/product/api/create-product'
import { axiosInstance } from '@ec-client/shared/lib/axios'
import { Button } from '@nx-mono/ui'

export const HomePage = () => {
  const { mutate } = useCreateProduct()
  const ads: IAdvertising[] = [
    {
      id: 1,
      title: 'Ad 1',
      image: 'https://picsum.photos/seed/1/1000/500',
      description: 'This is an ad',
      url: '/ad1',
      external: false
    },
    {
      id: 2,
      title: 'Ad 2',
      image: 'https://picsum.photos/seed/2/1000/500',
      description: 'This is an ad',
      url: 'https://example.com',
      external: true
    },
    {
      id: 3,
      title: 'Ad 3',
      image: 'https://picsum.photos/seed/3/1000/500',
      description: 'This is an ad',
      url: '/ad3',
      external: false
    },
    {
      id: 4,
      title: 'Ad 4',
      image: 'https://picsum.photos/seed/4/1000/500',
      description: 'This is an ad',
      url: '/ad4',
      external: false
    }
  ]

  const onClickBtn = async () => {
    const data = {
      name: 'prod1',
      description: 'Product 1',
      price: 100,
      stock: 1000
    }
    await axiosInstance.products.createProduct(data)
    //mutate(data)
  }

  return (
    <div>
      <AdsCarousel ads={ads} />
      <h1>Home</h1>
      <Button onClick={onClickBtn}>Click me</Button>
    </div>
  )
}
