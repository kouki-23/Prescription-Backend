import { NextFunction, Request } from "express"
import { Response } from "express"
import { CreateUserBody } from "../Middlewares/validation/schema"
import { createUser } from "../Services/userService"
import { StatusCode, handleError } from "../Utils/HttpError"

export async function createUserHandler(
  req: Request<never, never, CreateUserBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createUser(req.body)
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    return next(handleError(e))
  }
}
