import { GetProductsQuery } from '@ec-application'
import { ApiResultDto, UseCaseInput, UseCaseOutput } from '@ec-common'
import { Injectable, Logger } from '@nestjs/common'
import { QueryBus, IQueryHandler } from '@nestjs/cqrs'
import { ApiProperty } from '@nestjs/swagger'

export class ProductsViewInput extends UseCaseInput {
  @ApiProperty({
    description: 'offset',
    required: false,
    type: Number
  })
  offset: number

  @ApiProperty({
    description: 'limit',
    required: false,
    type: Number
  })
  limit: number
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
    const { limit, offset } = input
    const query = new GetProductsQuery(offset, limit)
    console.log(
      '🚀 apps/ec-product-svc/src/views/products-view/index.ts:40 -> query: ',
      query
    )

    Logger.log(`GetProductsUseCase: ${JSON.stringify(query)}`)
    return this.queryBus.execute(query)
  }
}
