import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AbstractProductRepository } from '@ec-domain/products'
import {
  OutboxService,
  ProductRepository,
  TransactionService
} from '@ec-infrastructure'
import { Inject } from '@nestjs/common'
import { CreateProductCommand } from '../impl'

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(AbstractProductRepository)
    private readonly repository: ProductRepository,

    private readonly outboxService: OutboxService,
    private readonly transactionService: TransactionService
  ) {}

  async execute(command: CreateProductCommand) {
    // Execute within a transaction
    return this.transactionService.executeInTransaction(async entityManager => {
      // 1. Create product in the domain
      const product = await this.repository.create(
        {
          name: command.name,
          description: command.description,
          price: command.price,
          stock: command.stock
        },
        entityManager
      )

      // 2. Store the domain event in the outbox table (part of the same transaction)
      await this.outboxService.addEvent(
        'Product', // Aggregate type
        product.id, // Aggregate ID
        'ProductCreated', // Event type
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          createdAt: new Date()
        }, // Event payload
        entityManager // Pass the same entity manager to ensure transaction consistency
      )

      return product
    })
  }
}
