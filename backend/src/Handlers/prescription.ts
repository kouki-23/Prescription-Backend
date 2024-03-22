import {
  CreatePrescriptionBody,
  IdParams,
} from "../Middlewares/validation/schema"
import { NextFunction, Request, Response } from "express"
import {
  createPrescrptition,
  deletePrescription,
  getPrescriptionById,
  getPrescriptionWithEverythingByPatientId,
  updatePrescription,
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

export async function getPrescriptionsWithEverythingByPatientIdHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const patientId = req.params.id
  try {
    const pres = await getPrescriptionWithEverythingByPatientId(
      Number(patientId),
    )
    pres.forEach((p) => {
      p.cures.sort((a, b) => a.order - b.order)
    })
    res.json(pres)
  } catch (e) {
    return next(
      new HttpError("cannot get prescription", StatusCode.InternalServerError),
    )
  }
}

export async function getPrescriptionByIdHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const prescription = await getPrescriptionById(Number(id))
    if (!prescription) {
      return next(new HttpError("invalid id", StatusCode.NotFound))
    }
    return res.send(prescription)
  } catch (e) {
    return next(
      new HttpError("cannot get prescription", StatusCode.InternalServerError),
    )
  }
}

export async function updatePrescriptionHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const result = await updatePrescription(Number(id), req.body)
    return res.json(result.generatedMaps)
  } catch (e) {
    return next(
      new HttpError(
        "cannot update prescription",
        StatusCode.InternalServerError,
      ),
    )
  }
}

export async function deletePrescriptionHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await deletePrescription(Number(id))
    return res.sendStatus(StatusCode.Ok)
  } catch (e) {
    return next(
      new HttpError(
        "cannot delete prescription",
        StatusCode.InternalServerError,
      ),
    )
  }
}
