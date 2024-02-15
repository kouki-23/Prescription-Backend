import { NextFunction, Request, Response } from "express"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { login } from "../Services/authService"
import { LoginBody, refreshTokenBody } from "../Middlewares/validation/schema"
import jwt from "jsonwebtoken"
import { getSecretJWT, verifyJWT } from "../Utils/jwt"
import db from "../Config/db"
import { User } from "../Entities/User"

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

//TODO : database for refresh tokens
export async function refreshTokenHandler(
  req: Request<never, never, refreshTokenBody, never>,
  res: Response,
  next: NextFunction,
) {
  const { token } = req.body
  try {
    const payload = verifyJWT(token)
    const id = payload.user.id
    const user = await db.getRepository(User).findOneBy({
      id,
    })
    if (!user) throw "unknown user"
    const accessToken = jwt.sign(
      {
        user: { id: user.id, username: user.username },
      },
      getSecretJWT(),
      {
        expiresIn: "1h",
      },
    )
    res.json({
      accessToken,
    })
  } catch {
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  }
}
