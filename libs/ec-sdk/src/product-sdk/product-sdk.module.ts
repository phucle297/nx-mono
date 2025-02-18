import { Module } from '@nestjs/common'
import { ProductClient } from './product-sdk.client'
import { ProductModule } from '@ec-product-svc/product.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PRODUCT_PACKAGE_NAME, PRODUCT_USE_CASES_SERVICE_NAME } from '@ec-proto'
import { join } from 'path'
import { InternalApiModule } from '@ec-application'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_USE_CASES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(__dirname, './product.proto')
        }
      }
    ]),
    ProductModule,
    InternalApiModule
  ],
  providers: [ProductClient],
  exports: [ProductClient]
})
export class ProductSDKModule {}
