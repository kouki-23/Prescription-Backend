import { NextFunction, Request, Response } from "express"
import {
  addPrepMoleculeToCure,
  deleteCure,
  updateCure,
} from "../Services/cureService"
import { HttpError, StatusCode, handleError } from "../Utils/HttpError"
import {
  IdParams,
  addPrepMoleculeToCureBody,
} from "../Middlewares/validation/schema"

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
    return next(handleError(e))
  }
}

export async function addPrepMoleculeToCureHandler(
  req: Request<IdParams, never, addPrepMoleculeToCureBody>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const cure = await addPrepMoleculeToCure(Number(id), req.body)
    return res.json(cure)
  } catch (e) {
    console.log(e)
    return next(handleError(e))
  }
}

export async function deleteCureHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await deleteCure(Number(id))
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    return next(handleError(e))
  }
}
