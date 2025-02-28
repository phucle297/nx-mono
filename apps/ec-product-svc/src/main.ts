import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import {
  PRODUCT_USE_CASES_PACKAGE_NAME,
  PRODUCT_VIEWS_PACKAGE_NAME
} from '@ec-domain/products'
import { ProductModule } from './product.module'

async function bootstrap() {
  // For commands
  //const commandApp = await NestFactory.createMicroservice<MicroserviceOptions>(
  //  ProductCommandModule,
  //  {
  //    transport: Transport.GRPC,
  //    options: {
  //      package: PRODUCT_USE_CASES_PACKAGE_NAME,
  //      protoPath: join(__dirname, './', 'product-use-cases.proto'),
  //      url: process.env.PRODUCT_COMMAND_GRPC_URL || '0.0.0.0:50051'
  //    }
  //  }
  //)
  //
  //// For queries
  //const queryApp = await NestFactory.createMicroservice<MicroserviceOptions>(
  //  ProductQueryModule,
  //  {
  //    transport: Transport.GRPC,
  //    options: {
  //      package: PRODUCT_VIEWS_PACKAGE_NAME,
  //      protoPath: join(__dirname, './', 'product-views.proto'),
  //      url: process.env.PRODUCT_VIEW_GRPC_URL || '0.0.0.0:50052'
  //    }
  //  }
  //)
  //
  //await Promise.all([commandApp.listen(), queryApp.listen()])
  //
  const app = await NestFactory.create(ProductModule)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_USE_CASES_PACKAGE_NAME,
      protoPath: join(__dirname, './', 'product-use-cases.proto'),
      url: process.env.PRODUCT_COMMAND_GRPC_URL || '0.0.0.0:50051'
    }
  })
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_VIEWS_PACKAGE_NAME,
      protoPath: join(__dirname, './', 'product-views.proto'),
      url: process.env.PRODUCT_VIEW_GRPC_URL || '0.0.0.0:50052'
    }
  })

  await app.startAllMicroservices()
}

bootstrap()
