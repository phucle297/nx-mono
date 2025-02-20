import { ApiGatewaySdk } from '@ec-api-gateway-sdk'

export const axiosInstance = new ApiGatewaySdk(import.meta.env.VITE_BASE_URL)
