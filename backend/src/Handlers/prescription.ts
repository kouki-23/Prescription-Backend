import {
  CreatePrescriptionBody,
  IdParams,
  updateCureStartDateBody,
} from "../Middlewares/validation/schema"
import { NextFunction, Request, Response } from "express"
import {
  createPrescrptition,
  deletePrescription,
  getPrescriptionById,
  getPrescriptionWithEverythingByPatientId,
  updatePrescription,
} from "../Services/prescriptionSevice"
import { HttpError, StatusCode, handleError } from "../Utils/HttpError"

export async function createPrescriptionHandler(
  req: Request<never, never, CreatePrescriptionBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createPrescrptition(req.body)
    res.sendStatus(200)
  } catch (e) {
    return next(handleError(e))
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
      p.cures.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
    })
    res.json(pres)
  } catch (e) {
    console.log(e)
    return next(handleError(e))
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
      throw next(new HttpError("invalid id", StatusCode.NotFound))
    }
    return res.send(prescription)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function updatePrescriptionHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await updatePrescription(Number(id), req.body)
    return res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    return next(handleError(e))
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
    return res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function updateCureStartDateHandler(
  req: Request<IdParams, never, updateCureStartDateBody>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const prescription = await getPrescriptionById(Number(id))
    const cureIndex = prescription.cures.findIndex(
      (c) => c.id === req.body.cureId,
    )
    if (!cureIndex) {
      throw new HttpError("cure untrouvable", StatusCode.BadRequest)
    }
    prescription.cures[cureIndex].startDate = new Date(req.body.date)
    if (req.body.cascade) {
      let d = prescription.cures[cureIndex].startDate
      for (let i = cureIndex; i < prescription.cures.length; i++) {
        d.setDate(d.getDate() + prescription.intercure)
        prescription.cures[i].startDate = d
      }
    }
    await updatePrescription(prescription.id, prescription)
    return res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    return next(handleError(e))
  }
}
