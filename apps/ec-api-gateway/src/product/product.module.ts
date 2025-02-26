import { Module } from '@nestjs/common'
import { ProductSdkModule } from '@ec-services-sdk'
import { ProductController } from './controller/v1/product.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import {
  PRODUCT_USE_CASES_PACKAGE_NAME,
  PRODUCT_VIEWS_PACKAGE_NAME
} from '@ec-domain/products'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductSdkModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        urlUseCases:
          //configService.get('PRODUCT_USE_CASES_GRPC_URL') ||
          '0.0.0.0:50001',
        protoPathUseCases: join(
          __dirname,
          './',
          //configService.get('PRODUCT_USE_CASES_PROTO_NAME') ||
          'product-use-cases.proto'
        ),
        packageUseCases: PRODUCT_USE_CASES_PACKAGE_NAME
      })
    }),
    ProductSdkModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        urlViews:
          //configService.get('PRODUCT_VIEWS_GRPC_URL') ||
          '0.0.0.0:50002',
        protoPathViews: join(
          __dirname,
          './',
          //configService.get('PRODUCT_VIEWS_PROTO_NAME') ||
          'product-views.proto'
        ),
        packageViews: PRODUCT_VIEWS_PACKAGE_NAME
      })
    })
  ],
  controllers: [ProductController]
})
export class ProductModule {}
