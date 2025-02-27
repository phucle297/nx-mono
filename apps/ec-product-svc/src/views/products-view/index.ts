import { GetProductsQuery } from '@ec-application'
import { ApiResultDto, UseCaseInput, UseCaseOutput } from '@ec-common'
import { Injectable, Logger } from '@nestjs/common'
import { QueryBus, IQueryHandler } from '@nestjs/cqrs'
import { ApiProperty } from '@nestjs/swagger'

export class ProductsViewInput extends UseCaseInput {
  @ApiProperty({
    description: 'limit',
    required: false,
    type: Number
  })
  limit: number

  @ApiProperty({
    description: 'page',
    required: false,
    type: Number
  })
  page: number
}

export class ProductsViewOutput extends UseCaseOutput {
  @ApiProperty({
    description: 'API result',
    type: ApiResultDto,
    required: true
  })
  result: ApiResultDto
}

@Injectable()
export class ProductsView
  implements IQueryHandler<ProductsViewInput, ProductsViewOutput>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(input: ProductsViewInput) {
    const { page, limit } = input
    const query = new GetProductsQuery(page, limit)
    Logger.log(`GetProductsUseCase: ${JSON.stringify(query)}`)
    return this.queryBus.execute(query)
  }
}
