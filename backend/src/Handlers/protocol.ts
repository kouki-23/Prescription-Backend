import { CreateProtocolBody, IdParams } from "../Middlewares/validation/schema"
import { NextFunction, Response } from "express"
import { Request } from "express"
import {
  CreateProtocol,
  deleteProtocol,
  getAllProtocols,
  getProtocolWithMolecules,
} from "../Services/protocolService"
import { HttpError, StatusCode } from "../Utils/HttpError"

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
    const protocols = await getAllProtocols()
    res.json(protocols)
  } catch (e) {
    return next(
      new HttpError(
        "could not find any protocol",
        StatusCode.InternalServerError,
      ),
    )
  }
}

export async function getProtocolWithMoleculesHandler(
  req: Request<IdParams, never, never, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const protocol = await getProtocolWithMolecules(Number(req.params.id))
    res.json(protocol)
  } catch (e) {
    return next(e)
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
    if (isdeleted) {
      res.sendStatus(200)
    }
  } catch (e) {
    return next(
      new HttpError("could not delete Protocol ", StatusCode.BadRequest),
    )
  }
}
