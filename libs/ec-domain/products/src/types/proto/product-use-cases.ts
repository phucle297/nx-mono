// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.12.4
// source: product-use-cases.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";


export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateProductResponse {
}

export const PRODUCT_USE_CASES_PACKAGE_NAME = "productUseCases";

export interface ProductUseCasesClient {
  createProductUseCase(request: CreateProductRequest): Observable<CreateProductResponse>;
}

export interface ProductUseCasesController {
  createProductUseCase(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;
}

export function ProductUseCasesControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProductUseCase"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductUseCases", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductUseCases", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_USE_CASES_SERVICE_NAME = "ProductUseCases";
