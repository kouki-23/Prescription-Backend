import { NextFunction, Request } from "express"
import { CreatePatientBody } from "../Middlewares/validation/schema"
import { Response } from "express"
import { createPatient, getAllPatients } from "../Services/patientService"
import { HttpError, StatusCode } from "../Utils/HttpError"

export async function createPatientHandler(
  req: Request<never, never, CreatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createPatient(req.body)
    res.sendStatus(200)
  } catch (e) {
    return next(
      new HttpError("cannot create patient", StatusCode.InternalServerError),
    )
  }
}

export async function GetAllPatientsHandler(
  req: Request<never, never, CreatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const patients = await getAllPatients()
    res.json(patients)
  } catch (e) {
    return next(
      new HttpError("connot get patients", StatusCode.InternalServerError),
    )
  }
}
