import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductClient } from './product-sdk.client'
import { CreateProductHandler, ListProductsHandler } from '@ec-application'
import { ProductCreatedEvent } from '@ec-domain/products'
import { RepositoryProviders } from 'libs/ec-application/src/internal-api.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import {
  PRODUCT_PACKAGE_NAME,
  CREATE_PRODUCT_USECASE_SERVICE_NAME
} from '@ec-proto'
import { join } from 'path'

export const CommandHandlers = [CreateProductHandler]
export const QueryHandlers = [ListProductsHandler]
export const EventHandlers = [ProductCreatedEvent]

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: CREATE_PRODUCT_USECASE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(__dirname, './product.proto')
        }
      }
    ])
  ],
  providers: [
    ProductClient,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ...RepositoryProviders
  ],
  exports: [ProductClient]
})
export class ProductSDKModule {}
