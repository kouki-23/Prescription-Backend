import { NextFunction, Request, Response } from "express"
import {
  CreatePatientBody,
  IdParams,
  UpdatePatientBody,
} from "../Middlewares/validation/schema"
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient,
} from "../Services/patientService"
import { HttpError, StatusCode, handleError } from "../Utils/HttpError"

export async function createPatientHandler(
  req: Request<never, never, CreatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw ""
    }
    await createPatient(req.body, req.user.id)
    res.sendStatus(200)
  } catch (e) {
    return next(handleError(e))
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
      new HttpError("cannot get patients", StatusCode.InternalServerError),
    )
  }
}

export async function getPatientByIdHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const patient = await getPatientById(Number(id))
    res.json(patient)
  } catch (e) {
    next(handleError(e))
  }
}

export async function updatePatientHandler(
  req: Request<IdParams, never, UpdatePatientBody, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    if (req.user) {
      await updatePatient(Number(id), req.body, req.user.id)
    }
    res.sendStatus(200)
  } catch (e) {
    next(handleError(e))
  }
}

export async function deletePatientHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    if (req.user) {
      await deletePatient(Number(id), req.user.id)
    }
    res.sendStatus(200)
  } catch (e) {
    next(handleError(e))
  }
}
