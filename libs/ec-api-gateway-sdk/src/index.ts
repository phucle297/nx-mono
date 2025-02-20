import { AxiosRequestConfig } from 'axios'
import { ProductClient } from './services/product-client'

export class ApiGatewaySdk {
  readonly products: ProductClient

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    console.log('🚀 libs/ec-api-gateway-sdk/src/index.ts:7 -> config: ', config)
    this.products = new ProductClient(baseURL, config)
  }
}
