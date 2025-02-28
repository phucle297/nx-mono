import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager } from 'typeorm'
import { CreateProductDto, Product } from '@ec-domain/products'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async save(product: Product, entityManager?: EntityManager) {
    if (entityManager) {
      await entityManager.save(Product, product)
    } else {
      await this.productRepository.save(product)
    }
  }

  async create(
    productData: CreateProductDto,
    entityManager?: EntityManager
  ): Promise<Product> {
    const newProduct = new Product(
      Date.now().toString(),
      productData.name,
      productData.description,
      productData.price,
      productData.stock
    )
    if (entityManager) {
      await entityManager.save(Product, newProduct)
    } else {
      await this.productRepository.save(newProduct)
    }

    return newProduct
  }

  async findById(id: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } })
  }

  async findAll(query: { page?: number; limit?: number }) {
    const { limit = 10, page = 1 } = query
    Logger.log('ListProductsQuery', JSON.stringify(query))

    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    })

    return {
      data: products,
      limit,
      page,
      total
    }
  }
}
