import { DynamicModule, Module } from '@nestjs/common'
import { ProductClient } from './product-sdk.client'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PRODUCT_PACKAGE_NAME, PRODUCT_USE_CASES_SERVICE_NAME } from '@ec-proto'
import { join } from 'path'
import { InternalApiModule } from '@ec-application'
import { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE } from './module-builder'
import { ProductSdkModuleOptions } from './product-sdk.config'

@Module({})
export class ProductSdkModule extends ConfigurableModuleClass {
  static forRoot(options: ProductSdkModuleOptions): DynamicModule {
    const protoPath = options.protoPath || join(__dirname, './product.proto')
    const url = options.url || '0.0.0.0:50001'

    return {
      module: ProductSdkModule,
      imports: [
        ClientsModule.register([
          {
            name: PRODUCT_USE_CASES_SERVICE_NAME,
            transport: Transport.GRPC,
            options: {
              url,
              package: PRODUCT_PACKAGE_NAME,
              protoPath: protoPath
            }
          }
        ]),
        InternalApiModule
      ],
      providers: [ProductClient],
      exports: [ProductClient]
    }
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      module: ProductSdkModule,
      imports: [
        ...(options.imports || []),
        ClientsModule.registerAsync([
          {
            name: PRODUCT_USE_CASES_SERVICE_NAME,
            imports: [...(options.imports || [])],
            inject: [...(options.inject || [])],
            useFactory: async (...args) => {
              const config = (await options?.useFactory?.(...args)) || {
                url: '',
                package: '',
                protoPath: ''
              }
              return {
                transport: Transport.GRPC,
                options: {
                  url: config.url,
                  package: config.package,
                  protoPath: config.protoPath
                }
              }
            }
          }
        ]),
        InternalApiModule
      ],
      providers: [ProductClient],
      exports: [ProductClient]
    }
  }
}
