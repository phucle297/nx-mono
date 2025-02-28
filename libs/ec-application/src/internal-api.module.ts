import { Module, Provider } from '@nestjs/common'
import {
  CreateProductHandler,
  GetProductsHandler,
  ProductRepositoryProvider
} from './product'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from '@ec-domain/products'
import { ProductRepository } from '@ec-infrastructure'
import { CqrsModule } from '@nestjs/cqrs'

export const RepositoryProviders: Provider[] = [ProductRepositoryProvider]

export const CommandHandlers = [CreateProductHandler]
export const QueryHandlers = [GetProductsHandler]
export const EventHandlers = []

@Module({
  providers: [...RepositoryProviders],
  exports: [...RepositoryProviders]
})
export class Repositories {}

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    Repositories,
    CqrsModule.forRoot()
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ProductRepository
  ],
  controllers: [],
  exports: [ProductRepository]
})
export class InternalApiModule {}
