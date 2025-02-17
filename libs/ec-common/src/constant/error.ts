export enum ErrorCode {
  SYSTEM_ERR = 'SYSTEM_ERR'
}

export const ERROR_MESSAGE: {
  [key: string]: string
} = {
  [ErrorCode.SYSTEM_ERR]: 'Internal Server Error'
}

export const getErrorMessage = (errorCode: ErrorCode): string => {
  return ERROR_MESSAGE[errorCode]
}
