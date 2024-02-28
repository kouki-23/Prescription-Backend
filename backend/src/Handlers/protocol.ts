import {
  CreateProtocolBody,
  ProtocolByIdParams,
} from "../Middlewares/validation/schema"
import { NextFunction, Response } from "express"
import { Request } from "express"
import {
  CreateProtocol,
  deleteProtocol,
  getAllProtocols,
} from "../Services/protocolService"
import { HttpError, StatusCode } from "../Utils/HttpError"
export async function CreateProtocolHandler(
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

export async function getAllprotocolsHandler(
  req: Request<never, never, CreateProtocolBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    const protocol = await getAllProtocols()
    res.json(protocol)
  } catch (e) {
    return next(
      new HttpError(
        "could not find any protocol",
        StatusCode.InternalServerError,
      ),
    )
  }
}

export async function deleteProtocolHandler(
  req: Request<ProtocolByIdParams, never, never, never>,
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
