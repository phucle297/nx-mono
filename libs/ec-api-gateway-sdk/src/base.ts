import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class BaseApiClient {
  protected readonly axiosInstance: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api`,
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers
      }
    })
  }
}
