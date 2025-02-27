import { Product } from '../entity/product.entity'
import { AbstractBaseRepository } from './base'
import { PaginatedResponse } from '@ec-common'

export abstract class AbstractProductRepository extends AbstractBaseRepository {
  //findById: (id: string) => Promise<Product | null>
  //save: (product: Product) => Promise<void>
  findAll: ({
    page,
    limit
  }: {
    page: number
    limit: number
  }) => Promise<PaginatedResponse<Product[]>>
  //search: (query: string) => Promise<Product[]>
  //update: (product: Product) => Promise<void>
  //delete: (id: string) => Promise<void>
}
