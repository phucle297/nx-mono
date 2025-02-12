import { registerAs } from '@nestjs/config'
import { Expose } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'
import { Environment, validate } from '@ec-common'

export class AppVariables {
  @IsString()
  @Expose()
  APP_PORT: string

  @IsString()
  @Expose()
  APP_PREFIX: string

  @IsEnum(Environment)
  @Expose()
  NODE_ENV: Environment
}

export const app = registerAs('app', () => {
  const envVar = validate(process.env, AppVariables)

  return envVar
})
