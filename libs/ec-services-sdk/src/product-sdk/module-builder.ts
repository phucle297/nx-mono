import { ConfigurableModuleBuilder } from '@nestjs/common'
import { ProductSdkModuleOptions } from './product-sdk.config'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE
} = new ConfigurableModuleBuilder<ProductSdkModuleOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createProductSDKOptions')
  .build()
