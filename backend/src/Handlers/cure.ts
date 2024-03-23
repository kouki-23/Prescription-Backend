import { NextFunction, Request, Response } from "express"
import {
  addPrepMoleculeToCure,
  getCureById,
  updateCure,
} from "../Services/cureService"
import { HttpError, StatusCode } from "../Utils/HttpError"

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
    const cure = await getCureById(Number(id))
    return res.json(cure)
  } catch (e) {
    console.log(e)
    return next(
      new HttpError("could not add prepMolecule", StatusCode.BadRequest),
    )
  }
}
