// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.12.4
// source: product-common.proto

/* eslint-disable */


export interface ProtoPaginationDto {
  page: number;
  limit: number;
}

export interface ProtoEmpty {
}

export interface ProtoProducts {
  products: ProtoProduct[];
}

export interface ProtoProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const PRODUCT_COMMON_PACKAGE_NAME = "productCommon";
