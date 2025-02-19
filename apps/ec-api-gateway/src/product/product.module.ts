import { Module } from '@nestjs/common'
import { ProductSdkModule } from '@ec-sdk'
import { ProductController } from './controller/v1/product.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { PRODUCT_PACKAGE_NAME } from '@ec-proto'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductSdkModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get('PRODUCT_GRPC_URL') || '0.0.0.0:50001',
        protoPath: join(
          __dirname,
          './',
          configService.get('PRODUCT_PROTO_NAME') || 'product.proto'
        ),
        package: PRODUCT_PACKAGE_NAME
      })
    })
    //ProductSdkModule
  ],
  controllers: [ProductController]
})
export class ProductModule {}
