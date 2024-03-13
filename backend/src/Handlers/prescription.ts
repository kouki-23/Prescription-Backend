import {
  CreatePrescriptionBody,
  IdParams,
} from "../Middlewares/validation/schema"
import { NextFunction, Request, Response } from "express"
import {
  createPrescrptition,
  getPrescriptionWithEverythingByPatientId,
} from "../Services/prescriptionSevice"
import { HttpError, StatusCode } from "../Utils/HttpError"

export async function createPrescriptionHandler(
  req: Request<never, never, CreatePrescriptionBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createPrescrptition(req.body)
    res.sendStatus(200)
  } catch (e) {
    return next(
      new HttpError(
        "cannot create prescription",
        StatusCode.InternalServerError,
      ),
    )
  }
}

export async function getPrescriptionWithEverythingByPatientIdHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const patientId = req.params.id
  try {
    const pres = await getPrescriptionWithEverythingByPatientId(
      Number(patientId),
    )
    res.json(pres)
  } catch (e) {
    return next(
      new HttpError("cannot get prescription", StatusCode.InternalServerError),
    )
  }
}