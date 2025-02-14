import { Injectable, Logger } from '@nestjs/common'
import { Product } from '@ec-domain/products'

@Injectable()
export class ProductRepository {
  private readonly products = new Map<string, Product>()

  async save(product: Product): Promise<void> {
    this.products.set(product.id, product)
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) || null
  }

  async findAll(query: {
    offset?: number
    limit?: number
  }): Promise<Product[]> {
    Logger.log('ListProductsQuery', JSON.stringify(query))
    return Array.from(this.products.values())
  }
}
