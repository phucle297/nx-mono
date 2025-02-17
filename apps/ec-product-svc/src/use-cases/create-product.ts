import { UsecaseOutput, UsecaseInput, Usecase, ApiResultDto } from '@ec-common'
import { ApiProperty } from '@nestjs/swagger'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateProductCommand } from '@ec-application'

export class CreateProductUsecaseInput extends UsecaseInput {
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

export class CreateProductUsecaseOutput extends UsecaseOutput {
  @ApiProperty({
    description: 'API result',
    type: ApiResultDto,
    required: true
  })
  result: ApiResultDto
}

export class CreateProductUsecase extends Usecase<
  CreateProductUsecaseInput,
  CreateProductUsecaseOutput
> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    super()
  }

  async execute(input: CreateProductUsecaseInput) {
    const { name, price, description, stock } = input
    const command = new CreateProductCommand(name, description, price, stock)
    return this.commandBus.execute(command)
  }
}
