// libs/infrastructure/src/persistence/entities/product.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column()
  stock: number

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.stock = stock
  }
}
