import { NextFunction, Request, Response } from "express"
import {
  CreatePatientBody,
  GetPatientByIdParams,
} from "../Middlewares/validation/schema"
import {
  createPatient,
  getAllPatients,
  getPatientById,
} from "../Services/patientService"
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
    return new HttpError(
      "cannot create patient",
      StatusCode.InternalServerError,
    )
  }
}

export async function getAllPatientsHandler(
  req: Request<never, never, CreatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const patients = await getAllPatients()
    res.json(patients)
  } catch (e) {
    return new HttpError("connot get patients", StatusCode.InternalServerError)
  }
}

export async function getPatientByIdHandler(
  req: Request<GetPatientByIdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const patient = await getPatientById(id)
    res.json(patient)
  } catch (e) {
    next(e)
  }
}
