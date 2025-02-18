import { Module, Provider } from '@nestjs/common'
import {
  CreateProductHandler,
  ListProductsHandler,
  ProductRepositoryProvider
} from './product'
import { CqrsModule } from '@nestjs/cqrs'

export const RepositoryProviders: Provider[] = [ProductRepositoryProvider]

export const CommandHandlers = [CreateProductHandler]
export const QueryHandlers = [ListProductsHandler]
export const EventHandlers = []
@Module({
  providers: [...RepositoryProviders],
  exports: [...RepositoryProviders]
})
export class Repositories {}

@Module({
  imports: [CqrsModule, Repositories],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
  controllers: []
})
export class InternalApiModule {}
