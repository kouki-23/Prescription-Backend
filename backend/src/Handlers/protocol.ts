import { CreateProtocolBody, IdParams } from "../Middlewares/validation/schema"
import { NextFunction, Response } from "express"
import { Request } from "express"
import {
  CreateProtocol,
  deleteProtocol,
  getAllEnabledProtocols,
  getAllProtocols,
  getProtocolWithMolecules,
} from "../Services/protocolService"
import { HttpError, StatusCode, handleError } from "../Utils/HttpError"
import { UserRole } from "../Entities/User"
import { Protocol } from "../Entities/Protocol"

export async function createProtocolHandler(
  req: Request<never, never, CreateProtocolBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await CreateProtocol(req.body)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    next(
      new HttpError("cannot create Protocol", StatusCode.InternalServerError),
    )
  }
}

export async function getAllProtocolsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let protocols: Protocol[] = []
    if (req.user?.role === UserRole.ADMIN) {
      protocols = await getAllProtocols()
    } else {
      protocols = await getAllEnabledProtocols()
    }
    res.json(protocols)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function getProtocolWithMoleculesHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const protocol = await getProtocolWithMolecules(Number(req.params.id))
    if (req.user?.role !== UserRole.ADMIN && protocol.disabled) {
      throw new HttpError("forbidden", StatusCode.Forbidden)
    }
    res.json(protocol)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function deleteProtocolHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const isdeleted = await deleteProtocol(Number(id))
    if (!isdeleted) {
      throw "no protocol deleted"
    }
    res.sendStatus(200)
  } catch (e) {
    return next(handleError(e))
  }
}
