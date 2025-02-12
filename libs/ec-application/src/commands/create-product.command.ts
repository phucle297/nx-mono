export class CreateProductCommand {
  constructor(
    public readonly payload: {
      name: string
      description: string
      price: number
      stock: number
    }
  ) {}
}
