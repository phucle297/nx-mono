import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import {
  PRODUCT_USE_CASES_PACKAGE_NAME,
  PRODUCT_VIEWS_PACKAGE_NAME
} from '@ec-domain/products'
import { ProductCommandModule } from './product-command.module'
import { ProductQueryModule } from './product-query.module'

async function bootstrap() {
  //const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //  ProductModule,
  //  {
  //    transport: Transport.GRPC,
  //    options: {
  //      package: PRODUCT_PACKAGE_NAME,
  //      protoPath: join(
  //        __dirname,
  //        './',
  //        process.env.PRODUCT_PROTO_NAME || 'product.proto'
  //      ),
  //      url: process.env.PRODUCT_GRPC_URL || '0.0.0.0:50001'
  //    }
  //  }
  //)
  //await app.listen()

  // For commands
  const commandApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductCommandModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PRODUCT_USE_CASES_PACKAGE_NAME,
        protoPath: join(__dirname, './', 'product-use-cases.proto'),
        url: process.env.PRODUCT_COMMAND_GRPC_URL || '0.0.0.0:50001'
      }
    }
  )

  // For queries
  const queryApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductQueryModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PRODUCT_VIEWS_PACKAGE_NAME,
        protoPath: join(__dirname, './', 'product-views.proto'),
        url: process.env.PRODUCT_VIEW_GRPC_URL || '0.0.0.0:50002'
      }
    }
  )

  await Promise.all([commandApp.listen(), queryApp.listen()])
}

bootstrap()
