import { ProductCreatedEvent } from '@ec-domain/products'
import { AggregateRoot } from '@nestjs/cqrs'

export class ProductAggregate extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number
  ) {
    super()
  }
  createProduct(
    name: string,
    description: string,
    price: number,
    stock: number
  ) {
    this.apply(new ProductCreatedEvent(name, description, price, stock))
  }
}
