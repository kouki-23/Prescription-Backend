import { NextFunction, Request } from "express"
import { Response } from "express"
import { CreateUserBody } from "../Middlewares/validation/schema"
import { createUser } from "../Services/userService"
import { HttpError, StatusCode } from "../Utils/HttpError"

export async function createUserHandler(
  req: Request<never, never, CreateUserBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    createUser(req.body)
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    return new HttpError("cannot create user", StatusCode.InternalServerError)
  }
}
