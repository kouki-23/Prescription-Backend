import { NextFunction, Request, Response } from "express"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { login } from "../Services/authService"
import { LoginBody } from "../Middlewares/validation/schema"

export async function loginHandler(
  req: Request<never, never, LoginBody, never>,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body
  try {
    const data = await login(username, password)
    return res.json(data)
  } catch (e) {
    return next(e)
  }
}
