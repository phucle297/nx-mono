import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import {
  Product,
  ProductRepository,
  ProductCreatedEvent
} from '@ec-domain/products'
import { CreateProductCommand } from '../commands/create-product.command'

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly repository: ProductRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const { name, description, price, stock } = command.payload
    const product = new Product(
      Date.now().toString(),
      name,
      description,
      price,
      stock
    )

    await this.repository.save(product)
    this.eventBus.publish(
      new ProductCreatedEvent(product.id, product.name, product.price)
    )
  }
}
