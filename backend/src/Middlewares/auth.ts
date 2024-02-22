import { NextFunction, Request, Response } from "express"
import { HttpError, StatusCode } from "../Utils/HttpError"
import jwt, { JwtPayload } from "jsonwebtoken"
import { getSecretJWT, verifyJWT } from "../Utils/jwt"
import db from "../Config/db"
import { User, UserRole } from "../Entities/User"

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"]?.split(" ")[1]
  if (!token)
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  try {
    const payload = verifyJWT(token)
    const id = payload.user.id
    const user = await db.getRepository(User).findOneBy({
      id,
    })
    if (!user) {
      throw "unknown user"
    }
    req.user = user
    next()
  } catch (e) {
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === UserRole.ADMIN) {
    next()
  } else {
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  }
}

export function isMedecin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === UserRole.MEDECIN) {
    next()
  } else {
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  }
}

export function isPharmacien(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === UserRole.PHARMACIEN) {
    next()
  } else {
    return next(new HttpError("Unauthorized", StatusCode.Unauthorized))
  }
}
