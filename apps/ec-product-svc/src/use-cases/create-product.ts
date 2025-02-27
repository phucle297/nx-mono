import { UseCaseOutput, UseCaseInput, UseCase, ApiResultDto } from '@ec-common'
import { ApiProperty } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { CreateProductCommand } from '@ec-application'
import { Injectable, Logger } from '@nestjs/common'

export class CreateProductUseCaseInput extends UseCaseInput {
  @ApiProperty({
    description: 'Product name',
    required: true,
    type: String
  })
  name: string

  @ApiProperty({
    description: 'Product description',
    required: true,
    type: String
  })
  description: string

  @ApiProperty({
    description: 'Product price',
    required: true,
    type: Number
  })
  price: number

  @ApiProperty({
    description: 'Product stock',
    required: true,
    type: Number
  })
  stock: number
}

export class CreateProductUseCaseOutput extends UseCaseOutput {
  @ApiProperty({
    description: 'API result',
    type: ApiResultDto,
    required: true
  })
  result: ApiResultDto
}

@Injectable()
export class CreateProductUseCase extends UseCase<
  CreateProductUseCaseInput,
  CreateProductUseCaseOutput
> {
  constructor(private readonly commandBus: CommandBus) {
    super()
  }

  async execute(input: CreateProductUseCaseInput) {
    const { name, price, description, stock } = input
    const command = new CreateProductCommand(name, description, price, stock)
    Logger.log(`CreateProductUseCase: ${JSON.stringify(command)}`)
    return this.commandBus.execute(command)
  }
}
