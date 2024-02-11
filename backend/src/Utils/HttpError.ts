export enum StatusCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export class HttpError extends Error {
  code: StatusCode
  constructor(message: string, errorCode: StatusCode) {
    super(message)
    this.code = errorCode
  }
}
