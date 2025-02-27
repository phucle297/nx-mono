import { Injectable, Logger } from '@nestjs/common'
import { Product } from '@ec-domain/products'

const mockProducts = [
  new Product(
    'p1',
    'Laptop Pro 15',
    'High-end laptop with powerful specs',
    1500,
    10
  ),
  new Product(
    'p2',
    'Wireless Mouse',
    'Ergonomic wireless mouse with long battery life',
    30,
    50
  ),
  new Product(
    'p3',
    'Mechanical Keyboard',
    'RGB mechanical keyboard with blue switches',
    80,
    20
  ),
  new Product(
    'p4',
    'Gaming Monitor',
    '27-inch 144Hz gaming monitor with 1ms response time',
    300,
    15
  ),
  new Product(
    'p5',
    'Smartphone X',
    'Latest smartphone with an advanced camera system',
    1200,
    5
  )
]

@Injectable()
export class ProductRepository {
  private readonly products = new Map<string, Product>()
  constructor() {
    mockProducts.forEach(product => this.products.set(product.id, product))
  }

  async save(product: Product): Promise<void> {
    this.products.set(product.id, product)
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) || null
  }

  async findAll(query: { page?: number; limit?: number }) {
    const { limit = 10, page = 1 } = query
    Logger.log('ListProductsQuery', JSON.stringify(query))

    return {
      data: Array.from(this.products.values()).slice(
        (page - 1) * limit,
        page * limit
      ),
      limit,
      page,
      total: Array.from(this.products.values()).length
    }
  }
}
