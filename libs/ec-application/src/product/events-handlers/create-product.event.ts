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
}
