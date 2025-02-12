export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number
  ) {}

  updateDetails(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  updatePrice(newPrice: number) {
    this.price = newPrice;
  }

  updateStock(quantity: number) {
    this.stock += quantity;
  }
}
