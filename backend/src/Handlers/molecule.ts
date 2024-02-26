import { Request, NextFunction } from "express"
import {
  CreateMoleculeBody,
  MoleculeByIdParams,
  UpdateMoleculeBody,
} from "../Middlewares/validation/schema"
import {
  UpdateMolecule,
  createMolecule,
  deleteMolecule,
  getAllMolecules,
  getMoleculeById,
} from "../Services/moleculeService"
import { Response } from "express"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { nextTick } from "process"

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

export async function getMoleculeByIdHandler(
  req: Request<MoleculeByIdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const molecule = await getMoleculeById(Number(id))
    res.json(molecule)
  } catch (e) {
    next(e)
  }
}

export async function UpdateMoleculeBodyHandler(
  req: Request<MoleculeByIdParams, never, UpdateMoleculeBody, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const isUpdated = await UpdateMolecule(Number(id), req.body)
    if (isUpdated) {
      res.sendStatus(200)
    } else {
      next(new HttpError("No molecule Updated", StatusCode.BadRequest))
    }
  } catch (e) {
    next(e)
  }
}

export async function DeleteMoleculeHandler(
  req: Request<MoleculeByIdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const isdeleted = await deleteMolecule(Number(id))
    if (isdeleted) {
      res.sendStatus(200)
    } else {
      next(new HttpError("no molecule is deleted", StatusCode.BadRequest))
    }
  } catch (e) {
    next(e)
  }
}
