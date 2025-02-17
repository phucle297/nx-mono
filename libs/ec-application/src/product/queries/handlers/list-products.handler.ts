import { QueryHandler } from '@nestjs/cqrs'
import { ListProductsQuery } from '../impl'
import { ProductRepository } from '@ec-infrastructure'
import { AbstractProductRepository, Product } from '@ec-domain/products'
import { Inject } from '@nestjs/common'

@QueryHandler(ListProductsQuery)
export class ListProductsHandler {
  constructor(
    @Inject(AbstractProductRepository)
    private readonly repository: ProductRepository
  ) {}

  async execute(query: ListProductsQuery): Promise<Product[]> {
    const products = await this.repository.findAll(query)
    return products
  }
}
