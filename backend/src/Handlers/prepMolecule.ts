import { NextFunction, Request, Response } from "express"
import { updatePrepMolecule } from "../Services/prepMolecule"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { PrepMolecule } from "../Entities/PrepMolecule"

export async function updatePrepMoleculesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await Promise.all(
      req.body.map((p: PrepMolecule) => updatePrepMolecule(p.id, p)),
    )
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    console.log(e)
    next(new HttpError("could not update prepMolcule ", StatusCode.BadRequest))
  }
}
