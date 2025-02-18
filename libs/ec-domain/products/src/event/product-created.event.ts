export class ProductCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number
  ) {}
}
