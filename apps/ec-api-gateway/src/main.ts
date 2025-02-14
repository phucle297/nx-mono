import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.useLogger(app.get(Logger))

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setVersion('1.0')
    .build()
  const port = process.env.PORT || 3000
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(port)
}
bootstrap()
