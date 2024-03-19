import { NextFunction, Request, Response } from "express"
import { updateCure } from "../Services/CureService"
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
