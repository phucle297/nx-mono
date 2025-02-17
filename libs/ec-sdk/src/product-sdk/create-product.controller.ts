import {
  CreateProductResponse,
  CreateProductUsecaseControllerMethods
} from '@ec-proto'
import { CreateProductRequest } from './type'
import { Observable } from 'rxjs'

@CreateProductUsecaseControllerMethods()
export abstract class AbstractCreateProductGrpcController {
  abstract execute(
    request: CreateProductRequest
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse
}
