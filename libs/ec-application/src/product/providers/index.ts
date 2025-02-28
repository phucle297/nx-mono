import { AbstractProductRepository } from '@ec-domain/products'
import { ProductRepository } from '@ec-infrastructure'
import { Provider } from '@nestjs/common'

export const ProductRepositoryProvider: Provider = {
  provide: AbstractProductRepository,
  useClass: ProductRepository
}
