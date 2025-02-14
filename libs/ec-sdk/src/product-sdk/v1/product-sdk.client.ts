import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateProductCommand, ListProductsQuery } from '@ec-application'
import { ProductDto, CreateProductRequest, FindAllProductRequest } from './type'

@Injectable()
export class ProductClient {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createProduct(request: CreateProductRequest): Promise<ProductDto> {
    const { name, price, description, stock } = request
    const command = new CreateProductCommand(name, description, price, stock)
    return this.commandBus.execute(command)
  }

  async listProducts(request: FindAllProductRequest): Promise<ProductDto[]> {
    const query = new ListProductsQuery(
      request?.offset ?? 0,
      request?.limit ?? 10
    )
    return this.queryBus.execute(query)
  }
}
