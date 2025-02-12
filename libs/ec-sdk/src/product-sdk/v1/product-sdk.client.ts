import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateProductCommand } from '@ec-application'
import { ProductDTO, CreateProductRequest } from './type'

@Injectable()
export class ProductClient {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createProduct(request: CreateProductRequest): Promise<ProductDTO> {
    const { name, price, description, stock } = request
    const command = new CreateProductCommand({
      name,
      description,
      price,
      stock
    })
    return this.commandBus.execute(command)
  }
}
