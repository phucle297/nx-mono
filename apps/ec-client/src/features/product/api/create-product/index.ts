import { axiosInstance } from '@ec-client/shared/lib/axios'
import { CreateProductRequest } from '@ec-proto'
import { useMutation } from '@tanstack/react-query'
const createProduct = async (data: CreateProductRequest) => {
  return await axiosInstance.products.createProduct(data)
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct
  })
}
