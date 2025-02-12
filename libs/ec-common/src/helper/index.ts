import { ClassConstructor } from 'class-transformer/types/interfaces'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

export function validate<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>
): T {
  const validatedConfig = plainToInstance(envVariablesClass, config, {
    excludeExtraneousValues: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
