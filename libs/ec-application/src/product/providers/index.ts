import { AbstractProductRepository } from '@ec-domain/products'
import { ProductRepository } from '@ec-infrastructure'

export const ProductRepositoryProvider = {
  provide: AbstractProductRepository,
  useClass: ProductRepository
}
