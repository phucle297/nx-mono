import { Expose } from 'class-transformer'
import { ErrorCode, getErrorMessage } from '../../constant/error'
import { WarnCode, getWarnMessage } from '../../constant/warn'
import { ApiProperty } from '@nestjs/swagger'

export const ApiResultCode = {
  OK: 'OK',
  WARN: 'WARN',
  ERROR: 'ERROR'
} as const

export type ApiResultCode = (typeof ApiResultCode)[keyof typeof ApiResultCode]

export class ApiError {
  @ApiProperty({
    description: 'Error code',
    required: true,
    enum: ErrorCode,
    example: ErrorCode.SYSTEM_ERR
  })
  @Expose()
  code: ErrorCode

  @ApiProperty({
    description: 'Error message',
    required: true,
    type: String,
    example: 'Internal server error'
  })
  @Expose()
  message: string

  constructor(code: ErrorCode) {
    this.code = code
    this.message = getErrorMessage(code)
  }
}

export class ApiWarn {
  @ApiProperty({
    description: 'Warning code',
    required: true,
    enum: WarnCode,
    example: WarnCode.SYSTEM_WARN
  })
  @Expose()
  code: WarnCode

  @ApiProperty({
    description: 'Warning message',
    required: true,
    type: String,
    example: 'FBI Warning'
  })
  @Expose()
  message: string

  constructor(code: WarnCode) {
    this.code = code
    this.message = getWarnMessage(code)
  }
}

export class ApiResultDto {
  @ApiProperty({
    description: 'Api result code',
    required: true,
    enum: ApiResultCode,
    example: ApiResultCode.OK,
    default: ApiResultCode.OK
  })
  @Expose()
  code: ApiResultCode

  @ApiProperty({
    description: 'Warning list',
    required: true,
    type: [ApiWarn],
    default: []
  })
  @Expose()
  warnList: ApiWarn[]

  @ApiProperty({
    description: 'Error list',
    required: true,
    type: [ApiError],
    default: []
  })
  @Expose()
  errorList: ApiError[]

  @ApiProperty({
    description: 'Api result message',
    required: false,
    type: String,
    example: 'Success'
  })
  @Expose()
  message?: string

  constructor(params: {
    code: ApiResultCode
    message?: string
    warnList: ApiWarn[]
    errorList: ApiError[]
  }) {
    this.code = params.code
    this.message = params.message || ''
    this.warnList = params.warnList || []
    this.errorList = params.errorList || []
  }

  static ok() {
    return new ApiResultDto({
      code: ApiResultCode.OK,
      warnList: [],
      errorList: []
    })
  }

  static warn(warnList: ApiWarn[]) {
    return new ApiResultDto({
      code: ApiResultCode.WARN,
      warnList,
      errorList: []
    })
  }

  static error(errorList: ApiError[]) {
    return new ApiResultDto({
      code: ApiResultCode.ERROR,
      warnList: [],
      errorList
    })
  }
}
