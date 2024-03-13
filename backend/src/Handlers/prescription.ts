import { CreatePrescriptionBody } from "../Middlewares/validation/schema"
import { NextFunction, Request, Response } from "express"
import { createPrescrptition } from "../Services/prescriptionSevice"
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
      new HttpError("cannot create patient", StatusCode.InternalServerError),
    )
  }
}
