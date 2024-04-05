import { Request, NextFunction } from "express"
import {
  CreateMoleculeBody,
  IdParams,
  UpdateMoleculeBody,
} from "../Middlewares/validation/schema"
import {
  UpdateMolecule,
  createMolecule,
  deleteMolecule,
  getAllEnabledMolecules,
  getAllMolecules,
  getMoleculeById,
} from "../Services/moleculeService"
import { Response } from "express"
import { HttpError, StatusCode, handleError } from "../Utils/HttpError"
import { Molecule } from "../Entities/Molecule"
import { UserRole } from "../Entities/User"

export async function createMoleculeHandler(
  req: Request<never, never, CreateMoleculeBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createMolecule(req.body)
    return res.sendStatus(StatusCode.Ok)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function getAllMoleculesHandler(
  req: Request<never, never, CreateMoleculeBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    let molecules: Molecule[] = []
    if (req.user?.role === UserRole.ADMIN) {
      molecules = await getAllMolecules()
    } else {
      molecules = await getAllEnabledMolecules()
    }
    res.json(molecules)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function getMoleculeByIdHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const molecule = await getMoleculeById(Number(id))
    if (req.user?.role !== UserRole.ADMIN && molecule.disabled) {
      throw new HttpError("forbidden", StatusCode.Forbidden)
    }
    res.json(molecule)
  } catch (e) {
    next(handleError(e))
  }
}

export async function updateMoleculeHandler(
  req: Request<IdParams, never, UpdateMoleculeBody, never>,
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
    next(handleError(e))
  }
}

export async function deleteMoleculeHandler(
  req: Request<IdParams, never, never, never>,
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
    next(handleError(e))
  }
}
