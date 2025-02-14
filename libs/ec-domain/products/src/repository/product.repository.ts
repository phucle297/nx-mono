import { Product } from '../entity/product.entity'
import { AbstractBaseRepository } from './base'

export abstract class AbstractProductRepository extends AbstractBaseRepository {
  findById: (id: string) => Promise<Product | null>
  save: (product: Product) => Promise<void>
  findAll: ({
    offset,
    limit
  }: {
    offset: number
    limit: number
  }) => Promise<Product[]>
  //search: (query: string) => Promise<Product[]>
  //update: (product: Product) => Promise<void>
  //delete: (id: string) => Promise<void>
}
