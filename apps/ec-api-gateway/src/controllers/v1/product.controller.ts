import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '@ec-application';

@Controller('api/v1/products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async createProduct(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      stock: number;
    }
  ) {
    return this.commandBus.execute(
      new CreateProductCommand(
        body.name,
        body.description,
        body.price,
        body.stock
      )
    );
  }
}
