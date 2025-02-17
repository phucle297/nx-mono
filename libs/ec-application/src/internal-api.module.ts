import { Module, Provider } from '@nestjs/common'
import { ProductRepositoryProvider } from './product'

export const RepositoryProviders: Provider[] = [ProductRepositoryProvider]

@Module({
  providers: [...RepositoryProviders],
  exports: [...RepositoryProviders]
})
export class Repositories {}

@Module({
  imports: [Repositories],
  providers: [],
  controllers: []
})
export class InternalApiModule {}
