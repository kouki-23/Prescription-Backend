import { NextFunction, Request, Response } from "express"
import {
  CreatePatientBody,
  PatientByIdParams,
  UpdatePatientBody,
} from "../Middlewares/validation/schema"
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient,
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
    return next(
      new HttpError("cannot create patient", StatusCode.InternalServerError),
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
    return next(
      new HttpError("connot get patients", StatusCode.InternalServerError),
    )
  }
}

export async function getPatientByIdHandler(
  req: Request<PatientByIdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const patient = await getPatientById(Number(id))
    res.json(patient)
  } catch (e) {
    next(e)
  }
}

export async function updatePatientHandler(
  req: Request<PatientByIdParams, never, UpdatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const isUpdated = await updatePatient(Number(id), req.body)
    if (isUpdated) {
      res.sendStatus(200)
    } else {
      next(new HttpError("no patient is updated", StatusCode.BadRequest))
    }
  } catch (e) {
    next(e)
  }
}

export async function deletePatientHandler(
  req: Request<PatientByIdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const isDeleted = await deletePatient(Number(id))
    if (isDeleted) {
      res.sendStatus(200)
    } else {
      next(new HttpError("no patient is deleted", StatusCode.BadRequest))
    }
  } catch (e) {
    next(e)
  }
}
