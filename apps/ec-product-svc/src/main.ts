import { NestFactory } from '@nestjs/core'
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport
} from '@nestjs/microservices'
import { ProductModule } from './product.module'
import { PRODUCT_PACKAGE_NAME } from '@ec-proto'
import { join } from 'path'

const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: PRODUCT_PACKAGE_NAME,
    protoPath: join(__dirname, './product.proto')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    grpcOptions
  )
  app.listen()
}

bootstrap()
