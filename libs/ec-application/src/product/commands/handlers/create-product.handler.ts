import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import {
  AbstractProductRepository,
  Product,
  ProductCreatedEvent
} from '@ec-domain/products'
import { ProductRepository } from '@ec-infrastructure'
import { Inject } from '@nestjs/common'
import { CreateProductCommand } from '../impl'

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(AbstractProductRepository)
    private readonly repository: ProductRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const { name, description, price, stock } = command
    const product = new Product(
      Date.now().toString(),
      name,
      description,
      price,
      stock
    )

    await this.repository.save(product)
    this.eventBus.publish(
      new ProductCreatedEvent(
        product.id,
        product.name,
        product.price,
        product.stock
      )
    )
  }
}
