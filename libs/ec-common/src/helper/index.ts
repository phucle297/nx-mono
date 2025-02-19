import { ClassConstructor } from 'class-transformer/types/interfaces'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { ModuleMetadata } from '@nestjs/common'

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

export function concatModuleMetadata(metadataList: ModuleMetadata[]) {
  const result: ModuleMetadata = {
    imports: [],
    controllers: [],
    providers: [],
    exports: []
  }

  metadataList.forEach(metadata => {
    if (metadata.imports && result.imports)
      result.imports = result.imports.concat(metadata.imports)

    if (metadata.controllers && result.controllers)
      result.controllers = result.controllers.concat(metadata.controllers)

    if (metadata.providers && result.providers)
      result.providers = result.providers.concat(metadata.providers)

    if (metadata.exports && result.exports)
      result.exports = result.exports.concat(metadata.exports)
  })

  return result
}
