// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.12.4
// source: product-views.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { ProtoProduct, ProtoProducts } from "./product-common";


export interface GetProductsRequest {
  limit: number;
  offset: number;
}

export interface GetProductByIdRequest {
  id: string;
}

export const PRODUCT_VIEWS_PACKAGE_NAME = "productViews";

export interface ProductViewsClient {
  getProductById(request: GetProductByIdRequest): Observable<ProtoProduct>;

  getProducts(request: GetProductsRequest): Observable<ProtoProducts>;
}

export interface ProductViewsController {
  getProductById(request: GetProductByIdRequest): Promise<ProtoProduct> | Observable<ProtoProduct> | ProtoProduct;

  getProducts(request: GetProductsRequest): Promise<ProtoProducts> | Observable<ProtoProducts> | ProtoProducts;
}

export function ProductViewsControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getProductById", "getProducts"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductViews", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductViews", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_VIEWS_SERVICE_NAME = "ProductViews";
