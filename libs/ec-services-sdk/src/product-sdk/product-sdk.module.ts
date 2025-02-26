import { DynamicModule, Module } from '@nestjs/common'
import { ProductClient } from './product-sdk.client'
import { ClientsModule, Transport } from '@nestjs/microservices'
import {
  PRODUCT_USE_CASES_SERVICE_NAME,
  PRODUCT_VIEWS_SERVICE_NAME
} from '@ec-domain/products'
import { InternalApiModule } from '@ec-application'
import { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE } from './module-builder'

@Module({})
export class ProductSdkModule extends ConfigurableModuleClass {
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
                urlUseCases: '',
                packageUseCases: '',
                protoPathUseCases: ''
              }
              console.log(
                '🚀 libs/ec-services-sdk/src/product-sdk/product-sdk.module.ts:28 -> config: ',
                config
              )
              return {
                transport: Transport.GRPC,
                options: {
                  url: config.urlUseCases,
                  package: config.packageUseCases || '',
                  protoPath: config.protoPathUseCases
                }
              }
            }
          },
          {
            name: PRODUCT_VIEWS_SERVICE_NAME,
            imports: [...(options.imports || [])],
            inject: [...(options.inject || [])],
            useFactory: async (...args) => {
              const config = (await options?.useFactory?.(...args)) || {
                urlViews: '',
                packageViews: '',
                protoPathViews: ''
              }
              console.log(
                '🚀 libs/ec-services-sdk/src/product-sdk/product-sdk.module.ts:49 -> config: ',
                config
              )
              return {
                transport: Transport.GRPC,
                options: {
                  url: config.urlViews,
                  package: config.packageViews || '',
                  protoPath: config.protoPathViews
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
