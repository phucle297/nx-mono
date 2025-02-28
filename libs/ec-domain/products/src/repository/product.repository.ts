import { Product } from '../entity/product.entity'
import { AbstractBaseRepository } from './base'
import { PaginatedResponse } from '@ec-common'

export abstract class AbstractProductRepository extends AbstractBaseRepository {
  save: (product: Product) => Promise<void>
  create: (product: Product) => Promise<Product>
  findAll: ({
    page,
    limit
  }: {
    page: number
    limit: number
  }) => Promise<PaginatedResponse<Product[]>>
}
