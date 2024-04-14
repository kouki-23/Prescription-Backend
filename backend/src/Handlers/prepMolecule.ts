import { NextFunction, Request, Response } from "express"
import {
  adjustPrepMolecule,
  getAllValidPrepMolecules,
  getPrepMoleculeById,
  libratePrepMolecule,
  updatePrepMolecule,
} from "../Services/prepMoleculeServices"
import { StatusCode, handleError } from "../Utils/HttpError"
import { PrepMolecule } from "../Entities/PrepMolecule"
import {
  AdjustPrepMoleculeBody,
  IdParams,
} from "../Middlewares/validation/schema"

export async function updatePrepMoleculesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw "no user"
    }
    await Promise.all(
      req.body.map((p: PrepMolecule) => {
        if (!req.user) {
          throw "no user"
        }
        return updatePrepMolecule(p.id, p, req.user.id)
      }),
    )
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    next(handleError(e))
  }
}

export async function getAllValidPrepMoleculesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const preps = await getAllValidPrepMolecules()
    return res.json(preps)
  } catch (e) {
    next(handleError(e))
  }
}

export async function getPrepMoleculeByIdHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const prep = await getPrepMoleculeById(Number(id))
    return res.json(prep)
  } catch (e) {
    next(handleError(e))
  }
}

export async function adjustPrepMoleculeHandler(
  req: Request<IdParams, never, AdjustPrepMoleculeBody>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await adjustPrepMolecule(Number(id), req.body, req.user!.id)
    return res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function libratePrepMoleculeHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await libratePrepMolecule(Number(id), req.user!.id)
    return res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function updatePrepMoleculeHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await updatePrepMolecule(Number(id), req.body, req.user!.id)
    res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    return next(handleError(e))
  }
}
