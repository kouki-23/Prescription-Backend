import { Request, NextFunction } from "express"
import { CreateMoleculeBody } from "../Middlewares/validation/schema"
import { createMolecule, getAllMolecules } from "../Services/moleculeService"
import { Response } from "express"
import { HttpError, StatusCode } from "../Utils/HttpError"

export async function createMoleculeHandler(
  req: Request<never, never, CreateMoleculeBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createMolecule(req.body)
    res.sendStatus(200)
  } catch (e) {
    return next(
      new HttpError(
        "Could not create molecule",
        StatusCode.InternalServerError,
      ),
    )
  }
}

export async function getAllMoleculesHandler(
  req: Request<never, never, CreateMoleculeBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const molecules = await getAllMolecules()
    res.json(molecules)
  } catch (e) {
    return next(
      new HttpError(
        "could not find any molecules",
        StatusCode.InternalServerError,
      ),
    )
  }
}
