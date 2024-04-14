import { error } from "console"

export enum StatusCode {
  Ok = 200,
  NoContent = 204,
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

export function handleError(e: unknown) {
  console.log(e)
  if (e instanceof HttpError) {
    return e
  } else {
    return new HttpError(
      "Une erreur inconnue s'est produite",
      StatusCode.InternalServerError,
    )
  }
}
