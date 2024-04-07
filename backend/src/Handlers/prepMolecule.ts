import { NextFunction, Request, Response } from "express"
import { updatePrepMolecule } from "../Services/prepMoleculeServices"
import { StatusCode, handleError } from "../Utils/HttpError"
import { PrepMolecule } from "../Entities/PrepMolecule"

export async function updatePrepMoleculesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw "no user"
    }
    await Promise.all(
      req.body.map((p: PrepMolecule) => {
        if (!req.user) {
          throw "no user"
        }
        return updatePrepMolecule(p.id, p, req.user.id)
      }),
    )
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    next(handleError(e))
  }
}
