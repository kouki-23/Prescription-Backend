import { NextFunction, Request, Response } from "express"
import { HttpError, StatusCode } from "../Utils/HttpError"
import jwt, { JwtPayload } from "jsonwebtoken"
import { getSecretJWT } from "../Utils/helpers"
import db from "../Config/db"
import { User, UserRole } from "../Entities/User"

export function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]
  if (!token)
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  jwt.verify(token, getSecretJWT(), async (err, payload) => {
    if (err) return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
    const id = (payload as JwtPayload).id
    const user = await db.getRepository(User).findOneBy({
      id,
    })
    if (!user)
      return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
    req.user = user
    next()
  })
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === UserRole.ADMIN) {
    next()
  } else {
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  }
}
