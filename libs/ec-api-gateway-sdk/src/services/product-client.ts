import { AxiosRequestConfig } from 'axios'
import { BaseApiClient } from '../base'
import { CreateProductRequest, Product } from '@ec-domain/products'
import { PaginatedResponse } from '@ec-common'

export class ProductClient extends BaseApiClient {
  protected prefix: string
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config)
    this.prefix = '/v1'
  }

  async createProduct(data: CreateProductRequest) {
    return this.axiosInstance.post<Product>(`${this.prefix}/products`, data)
  }

  async getProduct(id: string) {
    return this.axiosInstance.get<Product>(`${this.prefix}/products/${id}`)
  }

  async getProducts(params?: { page?: number; limit?: number }) {
    return this.axiosInstance.get<PaginatedResponse<Product[]>>(
      `${this.prefix}/products`,
      {
        params
      }
    )
  }

  async updateProduct(id: string, data: Partial<CreateProductRequest>) {
    return this.axiosInstance.put<Product>(
      `${this.prefix}/products/${id}`,
      data
    )
  }

  async deleteProduct(id: string) {
    return this.axiosInstance.delete<void>(`${this.prefix}/products/${id}`)
  }
}
