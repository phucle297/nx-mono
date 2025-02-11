import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Product, ProductRepository } from '@ec-domain/products';
import { CreateProductCommand } from '../commands/create-product.command';
import { ProductCreatedEvent } from '@ec-domain/products';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly repository: ProductRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const product = new Product(
      Date.now().toString(),
      command.name,
      command.description,
      command.price,
      command.stock
    );

    await this.repository.save(product);
    this.eventBus.publish(
      new ProductCreatedEvent(product.id, product.name, product.price)
    );
  }
}
