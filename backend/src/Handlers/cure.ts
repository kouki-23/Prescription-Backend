import { NextFunction, Request, Response } from "express"
import { addPrepMoleculeToCure, updateCure } from "../Services/CureService"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { PrepMolecule } from "../Entities/PrepMolecule"

export async function updateCureHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await updateCure(Number(id), req.body)
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    console.log(e)
    next(new HttpError("could not update cure ", StatusCode.BadRequest))
  }
}

export async function addPrepMoleculeToCureHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await addPrepMoleculeToCure(Number(id), req.body)
  } catch {
    next(new HttpError("could not add prepMolecule", StatusCode.BadRequest))
  }
}
