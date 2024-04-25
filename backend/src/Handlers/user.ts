import { NextFunction, Request } from "express"
import { Response } from "express"
import { CreateUserBody, IdParams } from "../Middlewares/validation/schema"
import { createUser, deleteUser, getAllUsers } from "../Services/userService"
import { StatusCode, handleError } from "../Utils/HttpError"

export async function createUserHandler(
  req: Request<never, never, CreateUserBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createUser(req.body)
    res.sendStatus(StatusCode.Ok)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function getAllUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (e) {
    return next(handleError(e))
  }
}

export async function deleteUserHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await deleteUser(Number(id))
    res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    next(handleError(e))
  }
}
