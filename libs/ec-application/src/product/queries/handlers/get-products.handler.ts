import { QueryHandler } from '@nestjs/cqrs'
import { ProductRepository } from '@ec-infrastructure'
import { AbstractProductRepository } from '@ec-domain/products'
import { Inject } from '@nestjs/common'
import { GetProductsQuery } from '../impl'

@QueryHandler(GetProductsQuery)
export class GetProductsHandler {
  constructor(
    @Inject(AbstractProductRepository)
    private readonly repository: ProductRepository
  ) {}

  async execute(query: GetProductsQuery) {
    const products = await this.repository.findAll(query)
    return products
  }
}
