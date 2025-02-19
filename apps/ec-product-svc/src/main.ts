import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ProductModule } from './product.module'
import { PRODUCT_PACKAGE_NAME } from '@ec-proto'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PRODUCT_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          './',
          process.env.PRODUCT_PROTO_NAME || 'product.proto'
        ),
        url: process.env.PRODUCT_GRPC_URL || '0.0.0.0:50001'
      }
    }
  )
  await app.listen()
}

bootstrap()
